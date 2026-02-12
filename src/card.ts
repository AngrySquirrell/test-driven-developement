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

  static fromString(str: string): Card {
    str = str.trim();
    if (str.length < 2) throw new Error(`Invalid card string: ${str}`);

    const suitChar = str.slice(-1);
    const rankStr = str.slice(0, -1);

    let suit: Suit;
    switch (suitChar.toLowerCase()) {
      case "c":
      case "♣":
        suit = Suit.Clubs;
        break;
      case "d":
      case "♦":
        suit = Suit.Diamonds;
        break;
      case "h":
      case "♥":
        suit = Suit.Hearts;
        break;
      case "s":
      case "♠":
        suit = Suit.Spades;
        break;
      default:
        throw new Error(`Invalid suit: ${suitChar}`);
    }

    let rank: Rank;
    const num = Number(rankStr);
    if (!isNaN(num) && num >= 2 && num <= 10) {
      rank = num;
    } else {
      switch (rankStr.toUpperCase()) {
        case "T":
          rank = Rank.Ten;
          break;
        case "J":
          rank = Rank.Jack;
          break;
        case "Q":
          rank = Rank.Queen;
          break;
        case "K":
          rank = Rank.King;
          break;
        case "A":
          rank = Rank.Ace;
          break;
        default:
          throw new Error(`Invalid rank: ${rankStr}`);
      }
    }

    return new Card(rank, suit);
  }

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
