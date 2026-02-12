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
    // Sort descending by rank
    const sorted = [...cards].sort((a, b) => b.rank - a.rank);

    // Fallback: High Card
    return {
      category: HandCategory.HighCard,
      chosenCards: sorted.slice(0, 5)
    };
  }
}
