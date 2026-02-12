import { Card, Rank, Suit } from "../src/card";
import { HandEvaluator, HandCategory, HandResult } from "../src/hand-evaluator";

describe("Hand Comparison", () => {
  it("should rank categories correctly", () => {
    // Flush vs Straight
    const flush = {
      category: HandCategory.Flush,
      chosenCards: [],
    } as HandResult;
    const straight = {
      category: HandCategory.Straight,
      chosenCards: [],
    } as HandResult;

    expect(HandEvaluator.compare(flush, straight)).toBeGreaterThan(0);
  });

  it("should break ties with card ranks", () => {
    // Pair Kings vs Pair Queens
    const pairKings = {
      category: HandCategory.OnePair,
      chosenCards: [
        new Card(Rank.King, Suit.Clubs),
        new Card(Rank.King, Suit.Diamonds),
        new Card(Rank.Two, Suit.Hearts),
        new Card(Rank.Three, Suit.Hearts),
        new Card(Rank.Four, Suit.Hearts),
      ],
    };
    const pairQueens = {
      category: HandCategory.OnePair,
      chosenCards: [
        new Card(Rank.Queen, Suit.Clubs),
        new Card(Rank.Queen, Suit.Diamonds),
        new Card(Rank.Ace, Suit.Hearts),
        new Card(Rank.King, Suit.Hearts),
        new Card(Rank.Jack, Suit.Hearts),
      ],
    };

    expect(HandEvaluator.compare(pairKings, pairQueens)).toBeGreaterThan(0);
  });

  it("should break ties with kickers", () => {
    // Pair Kings, Ace kicker vs Pair Kings, Queen kicker
    const pairKingsAce = {
      category: HandCategory.OnePair,
      chosenCards: [
        new Card(Rank.King, Suit.Clubs),
        new Card(Rank.King, Suit.Diamonds),
        new Card(Rank.Ace, Suit.Hearts),
        new Card(Rank.Three, Suit.Hearts),
        new Card(Rank.Four, Suit.Hearts),
      ],
    };
    const pairKingsQueen = {
      category: HandCategory.OnePair,
      chosenCards: [
        new Card(Rank.King, Suit.Clubs),
        new Card(Rank.King, Suit.Diamonds),
        new Card(Rank.Queen, Suit.Hearts),
        new Card(Rank.Three, Suit.Hearts),
        new Card(Rank.Four, Suit.Hearts),
      ],
    };

    expect(HandEvaluator.compare(pairKingsAce, pairKingsQueen)).toBeGreaterThan(
      0,
    );
  });

  it("should identify ties", () => {
    const hand1 = {
      category: HandCategory.HighCard,
      chosenCards: [
        new Card(Rank.Ace, Suit.Clubs),
        new Card(Rank.King, Suit.Clubs),
        new Card(Rank.Queen, Suit.Clubs),
        new Card(Rank.Jack, Suit.Clubs),
        new Card(Rank.Nine, Suit.Diamonds),
      ],
    };
    const hand2 = {
      category: HandCategory.HighCard,
      chosenCards: [
        new Card(Rank.Ace, Suit.Diamonds),
        new Card(Rank.King, Suit.Diamonds),
        new Card(Rank.Queen, Suit.Diamonds),
        new Card(Rank.Jack, Suit.Diamonds),
        new Card(Rank.Nine, Suit.Clubs),
      ],
    };

    expect(HandEvaluator.compare(hand1, hand2)).toBe(0);
  });
});
