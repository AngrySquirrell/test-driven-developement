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

    // Check Flush & Straight Flush
    const suitGroups = new Map<import('./card').Suit, Card[]>();
    for (const card of sorted) {
      if (!suitGroups.has(card.suit)) suitGroups.set(card.suit, []);
      suitGroups.get(card.suit)!.push(card);
    }

    for (const group of suitGroups.values()) {
      if (group.length >= 5) {
        // Check Straight Flush
        const straightFlush = this.getStraight(group);
        if (straightFlush) {
          return {
            category: HandCategory.StraightFlush,
            chosenCards: straightFlush
          };
        }
        return {
          category: HandCategory.Flush,
          chosenCards: group.slice(0, 5)
        };
      }
    }

    // Check Straight
    const uniqueRankCards: Card[] = [];
    const seenRanks = new Set<Rank>();
    for (const card of sorted) {
      if (!seenRanks.has(card.rank)) {
        seenRanks.add(card.rank);
        uniqueRankCards.push(card);
      }
    }

    const straight = this.getStraight(uniqueRankCards);
    if (straight) {
      return {
        category: HandCategory.Straight,
        chosenCards: straight
      };
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

  private static getStraight(cards: Card[]): Card[] | null {
    if (cards.length < 5) return null;

    // Normal Straight
    for (let i = 0; i <= cards.length - 5; i++) {
      const slice = cards.slice(i, i + 5);
      if (slice[0].rank - slice[4].rank === 4) {
        return slice;
      }
    }

    // Ace Low Straight (Wheel): A, 5, 4, 3, 2
    const hasRank = (r: Rank) => cards.some(c => c.rank === r);
    if (hasRank(Rank.Ace) && hasRank(Rank.Five) && hasRank(Rank.Four) && hasRank(Rank.Three) && hasRank(Rank.Two)) {
      const get = (r: Rank) => cards.find(c => c.rank === r)!;
      return [get(Rank.Five), get(Rank.Four), get(Rank.Three), get(Rank.Two), get(Rank.Ace)];
    }

    return null;
  }
}
