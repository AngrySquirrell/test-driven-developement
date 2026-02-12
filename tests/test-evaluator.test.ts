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
});
