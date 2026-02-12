import { Card, Rank, Suit } from "../src/card";

describe("Card", () => {
  it("should create a card with rank and suit", () => {
    const card = new Card(Rank.Ace, Suit.Clubs);
    expect(card.rank).toBe(Rank.Ace);
    expect(card.suit).toBe(Suit.Clubs);
  });

  it("should return correct string representation", () => {
    const card = new Card(Rank.Ace, Suit.Clubs);
    expect(card.toString()).toBe("A♣");

    const card2 = new Card(Rank.Ten, Suit.Diamonds);
    expect(card2.toString()).toBe("10♦");
  });
});
