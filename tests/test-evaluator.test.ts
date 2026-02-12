import { Card, Rank, Suit } from '../src/card';
import { HandEvaluator, HandCategory } from '../src/hand-evaluator';

describe('HandEvaluator', () => {
  it('should identify High Card', () => {
    // A, K, Q, J, 9 (No straight, no flush)
    const cards = [
      new Card(Rank.Ace, Suit.Clubs),
      new Card(Rank.King, Suit.Diamonds),
      new Card(Rank.Queen, Suit.Hearts),
      new Card(Rank.Jack, Suit.Spades),
      new Card(Rank.Nine, Suit.Clubs),
      new Card(Rank.Two, Suit.Diamonds), // Extra
      new Card(Rank.Three, Suit.Hearts)  // Extra
    ];

    const result = HandEvaluator.evaluate(cards);
    
    expect(result.category).toBe(HandCategory.HighCard);
    expect(result.chosenCards.length).toBe(5);
    // Should be A, K, Q, J, 9
    expect(result.chosenCards[0].rank).toBe(Rank.Ace);
    expect(result.chosenCards[4].rank).toBe(Rank.Nine);
  });

  it('should identify One Pair', () => {
    const cards = [
      new Card(Rank.King, Suit.Clubs),
      new Card(Rank.King, Suit.Diamonds),
      new Card(Rank.Ace, Suit.Hearts),
      new Card(Rank.Queen, Suit.Spades),
      new Card(Rank.Jack, Suit.Clubs),
      new Card(Rank.Two, Suit.Diamonds),
      new Card(Rank.Three, Suit.Hearts)
    ];

    const result = HandEvaluator.evaluate(cards);

    expect(result.category).toBe(HandCategory.OnePair);
    expect(result.chosenCards.length).toBe(5);
    // K, K first
    expect(result.chosenCards[0].rank).toBe(Rank.King);
    expect(result.chosenCards[1].rank).toBe(Rank.King);
    // Kickers A, Q, J
    expect(result.chosenCards[2].rank).toBe(Rank.Ace);
    expect(result.chosenCards[3].rank).toBe(Rank.Queen);
    expect(result.chosenCards[4].rank).toBe(Rank.Jack);
  });

  it('should identify Two Pair', () => {
    const cards = [
      new Card(Rank.King, Suit.Clubs),
      new Card(Rank.King, Suit.Diamonds),
      new Card(Rank.Queen, Suit.Hearts),
      new Card(Rank.Queen, Suit.Spades),
      new Card(Rank.Jack, Suit.Clubs),
      new Card(Rank.Jack, Suit.Diamonds), // 3rd pair
      new Card(Rank.Nine, Suit.Hearts)
    ];

    const result = HandEvaluator.evaluate(cards);

    expect(result.category).toBe(HandCategory.TwoPair);
    expect(result.chosenCards.length).toBe(5);
    // K, K, Q, Q first
    expect(result.chosenCards[0].rank).toBe(Rank.King);
    expect(result.chosenCards[1].rank).toBe(Rank.King);
    expect(result.chosenCards[2].rank).toBe(Rank.Queen);
    expect(result.chosenCards[3].rank).toBe(Rank.Queen);
    // Kicker: J (from the remaining cards, the J pair is broken to provide a kicker? Yes. J is higher than 9)
    expect(result.chosenCards[4].rank).toBe(Rank.Jack);
  });

  it('should identify Three of a Kind', () => {
    const cards = [
      new Card(Rank.King, Suit.Clubs),
      new Card(Rank.King, Suit.Diamonds),
      new Card(Rank.King, Suit.Hearts),
      new Card(Rank.Queen, Suit.Spades),
      new Card(Rank.Jack, Suit.Clubs),
      new Card(Rank.Two, Suit.Diamonds),
      new Card(Rank.Three, Suit.Hearts)
    ];

    const result = HandEvaluator.evaluate(cards);

    expect(result.category).toBe(HandCategory.ThreeOfAKind);
    expect(result.chosenCards.length).toBe(5);
    // K, K, K first
    expect(result.chosenCards[0].rank).toBe(Rank.King);
    expect(result.chosenCards[1].rank).toBe(Rank.King);
    expect(result.chosenCards[2].rank).toBe(Rank.King);
    // Kickers Q, J
    expect(result.chosenCards[3].rank).toBe(Rank.Queen);
    expect(result.chosenCards[4].rank).toBe(Rank.Jack);
  });

  it('should identify Four of a Kind', () => {
    const cards = [
      new Card(Rank.King, Suit.Clubs),
      new Card(Rank.King, Suit.Diamonds),
      new Card(Rank.King, Suit.Hearts),
      new Card(Rank.King, Suit.Spades),
      new Card(Rank.Ace, Suit.Clubs),
      new Card(Rank.Two, Suit.Diamonds),
      new Card(Rank.Three, Suit.Hearts)
    ];

    const result = HandEvaluator.evaluate(cards);

    expect(result.category).toBe(HandCategory.FourOfAKind);
    expect(result.chosenCards.length).toBe(5);
    // K, K, K, K
    expect(result.chosenCards[0].rank).toBe(Rank.King);
    expect(result.chosenCards[3].rank).toBe(Rank.King);
    // Kicker A
    expect(result.chosenCards[4].rank).toBe(Rank.Ace);
  });

  it('should identify Full House', () => {
    const cards = [
      new Card(Rank.King, Suit.Clubs),
      new Card(Rank.King, Suit.Diamonds),
      new Card(Rank.King, Suit.Hearts),
      new Card(Rank.Queen, Suit.Spades),
      new Card(Rank.Queen, Suit.Clubs),
      new Card(Rank.Jack, Suit.Diamonds),
      new Card(Rank.Two, Suit.Hearts)
    ];

    const result = HandEvaluator.evaluate(cards);

    expect(result.category).toBe(HandCategory.FullHouse);
    expect(result.chosenCards.length).toBe(5);
    // K, K, K, Q, Q
    expect(result.chosenCards[0].rank).toBe(Rank.King);
    expect(result.chosenCards[2].rank).toBe(Rank.King);
    expect(result.chosenCards[3].rank).toBe(Rank.Queen);
    expect(result.chosenCards[4].rank).toBe(Rank.Queen);
  });

  it('should identify Flush', () => {
    const cards = [
      new Card(Rank.Ace, Suit.Hearts),
      new Card(Rank.Jack, Suit.Hearts),
      new Card(Rank.Eight, Suit.Hearts),
      new Card(Rank.Four, Suit.Hearts),
      new Card(Rank.Three, Suit.Hearts),
      new Card(Rank.King, Suit.Clubs),
      new Card(Rank.Two, Suit.Diamonds)
    ];

    const result = HandEvaluator.evaluate(cards);

    expect(result.category).toBe(HandCategory.Flush);
    expect(result.chosenCards.length).toBe(5);
    // Should be A, J, 8, 4, 3
    expect(result.chosenCards[0].rank).toBe(Rank.Ace);
    expect(result.chosenCards[1].rank).toBe(Rank.Jack);
    expect(result.chosenCards[4].rank).toBe(Rank.Three);
  });

  it('should identify Straight', () => {
    const cards = [
      new Card(Rank.Ten, Suit.Clubs),
      new Card(Rank.Nine, Suit.Diamonds),
      new Card(Rank.Eight, Suit.Hearts),
      new Card(Rank.Seven, Suit.Spades),
      new Card(Rank.Six, Suit.Clubs),
      new Card(Rank.Two, Suit.Diamonds), // Extra
      new Card(Rank.Ace, Suit.Hearts)    // Extra
    ];

    const result = HandEvaluator.evaluate(cards);

    expect(result.category).toBe(HandCategory.Straight);
    expect(result.chosenCards.length).toBe(5);
    // 10, 9, 8, 7, 6
    expect(result.chosenCards[0].rank).toBe(Rank.Ten);
    expect(result.chosenCards[4].rank).toBe(Rank.Six);
  });

  it('should identify Ace Low Straight', () => {
    const cards = [
      new Card(Rank.Ace, Suit.Clubs),
      new Card(Rank.Five, Suit.Diamonds),
      new Card(Rank.Four, Suit.Hearts),
      new Card(Rank.Three, Suit.Spades),
      new Card(Rank.Two, Suit.Clubs),
      new Card(Rank.King, Suit.Diamonds), // Extra
      new Card(Rank.Eight, Suit.Hearts)   // Extra
    ];

    const result = HandEvaluator.evaluate(cards);

    expect(result.category).toBe(HandCategory.Straight);
    expect(result.chosenCards.length).toBe(5);
    // 5, 4, 3, 2, A
    expect(result.chosenCards[0].rank).toBe(Rank.Five);
    expect(result.chosenCards[4].rank).toBe(Rank.Ace);
  });
});
