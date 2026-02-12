import { Card } from "./card";
import { HandEvaluator, HandResult } from "./hand-evaluator";

export interface PlayerInput {
  id: string;
  cards: string[];
}

export interface PlayerResult {
  playerId: string;
  hand: HandResult;
}

export interface GameResult {
  winners: PlayerResult[];
  players: PlayerResult[];
}

export class PokerGame {
  constructor(
    private boardStrs: string[],
    private playersInput: PlayerInput[],
  ) {}

  play(): GameResult {
    const board = this.boardStrs.map((s) => Card.fromString(s));

    const results: PlayerResult[] = this.playersInput.map((p) => {
      const hole = p.cards.map((s) => Card.fromString(s));
      if (hole.length !== 2)
        throw new Error(`Player ${p.id} must have 2 cards`);
      const allCards = [...board, ...hole];
      const bestHand = HandEvaluator.evaluate(allCards);
      return { playerId: p.id, hand: bestHand };
    });

    // Sort descending
    results.sort((a, b) => HandEvaluator.compare(a.hand, b.hand) * -1);

    if (results.length === 0) return { winners: [], players: [] };

    const bestHand = results[0].hand;
    const winners = results.filter(
      (r) => HandEvaluator.compare(r.hand, bestHand) === 0,
    );

    return {
      winners,
      players: results,
    };
  }
}
