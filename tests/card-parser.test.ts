import { Card, Rank, Suit } from '../src/card';

describe('Card Parsing', () => {
  it('should parse symbol format', () => {
    const c1 = Card.fromString('A♣');
    expect(c1.rank).toBe(Rank.Ace);
    expect(c1.suit).toBe(Suit.Clubs);
  });

  it('should parse letter format', () => {
    const c1 = Card.fromString('Ah'); // Ace Hearts
    expect(c1.rank).toBe(Rank.Ace);
    expect(c1.suit).toBe(Suit.Hearts);
    
    const c2 = Card.fromString('Td'); // Ten Diamonds
    expect(c2.rank).toBe(Rank.Ten);
    expect(c2.suit).toBe(Suit.Diamonds);
  });

  it('should throw on invalid format', () => {
    expect(() => Card.fromString('Xy')).toThrow();
  });
});
