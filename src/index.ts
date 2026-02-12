import { PokerGame } from './poker-game';

export function runExample() {
  console.log('--- Texas Holdem Hand Evaluator ---');
  
  console.log('\nExample A (Ace-low straight):');
  const game1 = new PokerGame(
      ['A♣', '2♦', '3♥', '4♠', '9♦'],
      [
          { id: 'Player 1', cards: ['5♣', 'K♦'] }
      ]
  );
  printResult(game1.play());

  console.log('\nExample D (Split):');
  const game2 = new PokerGame(
      ['5♣', '6♦', '7♥', '8♠', '9♦'],
      [
          { id: 'Player 1', cards: ['A♣', 'A♦'] },
          { id: 'Player 2', cards: ['K♣', 'Q♦'] }
      ]
  );
  printResult(game2.play());
}

function printResult(result: import('./poker-game').GameResult) {
  if (result.winners.length > 1) {
      console.log(`Winners: ${result.winners.map(w => w.playerId).join(', ')} (Tie)`);
  } else {
      console.log(`Winner: ${result.winners[0].playerId}`);
  }

  for (const p of result.players) {
      console.log(`${p.playerId}:`);
      console.log(`  Category: ${p.hand.category}`);
      console.log(`  Chosen 5: ${p.hand.chosenCards.map(c => c.toString()).join(' ')}`);
  }
}

if (require.main === module) {
  runExample();
}
