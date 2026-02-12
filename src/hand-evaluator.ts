import { Card, Rank } from './card';

export enum HandCategory {
  HighCard = 'High Card',
  OnePair = 'One Pair',
  TwoPair = 'Two Pair',
  ThreeOfAKind = 'Three of a Kind',
  Straight = 'Straight',
  Flush = 'Flush',
  FullHouse = 'Full House',
  FourOfAKind = 'Four of a Kind',
  StraightFlush = 'Straight Flush'
}

export interface HandResult {
  category: HandCategory;
  chosenCards: Card[];
}

export class HandEvaluator {
  static evaluate(cards: Card[]): HandResult {
    const sorted = [...cards].sort((a, b) => b.rank - a.rank);
    
    // Group by rank
    const rankGroups = new Map<Rank, Card[]>();
    for (const card of sorted) {
      if (!rankGroups.has(card.rank)) {
        rankGroups.set(card.rank, []);
      }
      rankGroups.get(card.rank)!.push(card);
    }

    const pairs: Card[][] = [];
    const trips: Card[][] = [];
    const quads: Card[][] = [];

    const sortedRanks = Array.from(rankGroups.keys()).sort((a, b) => b - a);

    for (const rank of sortedRanks) {
      const group = rankGroups.get(rank)!;
      if (group.length === 4) quads.push(group);
      else if (group.length === 3) trips.push(group);
      else if (group.length === 2) pairs.push(group);
    }

    if (quads.length > 0) {
      const bestQuad = quads[0];
      const kicker = sorted.filter(c => !bestQuad.includes(c))[0];
      return {
        category: HandCategory.FourOfAKind,
        chosenCards: [...bestQuad, kicker]
      };
    }

    if (trips.length >= 2) {
      const bestTrip = trips[0];
      const pairFromTrip = trips[1].slice(0, 2);
      return {
        category: HandCategory.FullHouse,
        chosenCards: [...bestTrip, ...pairFromTrip]
      };
    }

    if (trips.length === 1 && pairs.length >= 1) {
      const bestTrip = trips[0];
      const bestPair = pairs[0];
      return {
        category: HandCategory.FullHouse,
        chosenCards: [...bestTrip, ...bestPair]
      };
    }

    // Check Flush
    const suitGroups = new Map<import('./card').Suit, Card[]>();
    for (const card of sorted) {
      if (!suitGroups.has(card.suit)) suitGroups.set(card.suit, []);
      suitGroups.get(card.suit)!.push(card);
    }

    for (const group of suitGroups.values()) {
      if (group.length >= 5) {
        return {
          category: HandCategory.Flush,
          chosenCards: group.slice(0, 5)
        };
      }
    }

    if (trips.length > 0) {
      const bestTrip = trips[0];
      const kickers = sorted.filter(c => !bestTrip.includes(c)).slice(0, 2);
      return {
        category: HandCategory.ThreeOfAKind,
        chosenCards: [...bestTrip, ...kickers]
      };
    }

    if (pairs.length >= 2) {
      const bestPair = pairs[0];
      const secondPair = pairs[1];
      const usedCards = [...bestPair, ...secondPair];
      const kicker = sorted.filter(c => !usedCards.includes(c))[0];
      return {
        category: HandCategory.TwoPair,
        chosenCards: [...bestPair, ...secondPair, kicker]
      };
    }

    if (pairs.length > 0) {
      const bestPair = pairs[0];
      const kickers = sorted.filter(c => c.rank !== bestPair[0].rank).slice(0, 3);
      return {
        category: HandCategory.OnePair,
        chosenCards: [...bestPair, ...kickers]
      };
    }

    // Fallback: High Card
    return {
      category: HandCategory.HighCard,
      chosenCards: sorted.slice(0, 5)
    };
  }
}
