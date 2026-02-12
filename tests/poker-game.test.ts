import { PokerGame } from '../src/poker-game';

describe('PokerGame', () => {
  it('should determine winner', () => {
    // Example A from prompt
    // Board: A♣ 2♦ 3♥ 4♠ 9♦
    // Player: 5♣ K♦ (Straight Ace to 5)
    // Let's add Player 2: 6♣ 7♦ (High Card? No, Board plays A,2,3,4... maybe pair? No pairs)
    // Board: A, 2, 3, 4, 9.
    // P2: 6, 7.
    // Best P2: A, 9, 7, 6, 4 (High card Ace)
    
    // P1 wins with Straight.
    
    const game = new PokerGame(
      ['A♣', '2♦', '3♥', '4♠', '9♦'],
      [
        { id: 'P1', cards: ['5♣', 'K♦'] },
        { id: 'P2', cards: ['6♣', '7♦'] }
      ]
    );

    const result = game.play();
    expect(result.winners.length).toBe(1);
    expect(result.winners[0].playerId).toBe('P1');
    expect(result.winners[0].hand.category).toBe('Straight');
  });

  it('should handle split pot', () => {
    // Example D
    // Board: 5♣ 6♦ 7♥ 8♠ 9♦ (Straight on board)
    // Player 1: A♣ A♦ (Pair AA? No, Straight on board is 9-high. AA is Pair. Straight 9 beats Pair AA).
    // Wait. Board: 9, 8, 7, 6, 5. Straight.
    // P1: A, A. Best 5? 9,8,7,6,5 (Straight). (Or Pair A, A, 9, 8, 7? Straight beats pair).
    // So P1 has Straight.
    // P2: K♣ Q♦. P2 has Straight (Board plays).
    // Both use board. Tie.
    
    const game = new PokerGame(
      ['5♣', '6♦', '7♥', '8♠', '9♦'],
      [
        { id: 'P1', cards: ['A♣', 'A♦'] },
        { id: 'P2', cards: ['K♣', 'Q♦'] }
      ]
    );

    const result = game.play();
    expect(result.winners.length).toBe(2);
    expect(result.winners.map(w => w.playerId)).toContain('P1');
    expect(result.winners.map(w => w.playerId)).toContain('P2');
  });
});
