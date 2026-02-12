export enum Suit {
  Clubs = "♣",
  Diamonds = "♦",
  Hearts = "♥",
  Spades = "♠",
}

export enum Rank {
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
  Jack = 11,
  Queen = 12,
  King = 13,
  Ace = 14,
}

export class Card {
  constructor(
    public rank: Rank,
    public suit: Suit,
  ) {}

  toString(): string {
    let rankStr: string;
    switch (this.rank) {
      case Rank.Jack:
        rankStr = "J";
        break;
      case Rank.Queen:
        rankStr = "Q";
        break;
      case Rank.King:
        rankStr = "K";
        break;
      case Rank.Ace:
        rankStr = "A";
        break;
      default:
        rankStr = this.rank.toString();
    }
    return `${rankStr}${this.suit}`;
  }
}
