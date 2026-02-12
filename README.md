"# Texas Hold'em Hand Evaluator

A TypeScript TDD implementation of a Texas Hold'em hand evaluator.

## Project Structure

- `src/`: Source code.
- `tests/`: Jest tests.
- `students.txt`: List of students (Github username).

## Setup & Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run tests:

   ```bash
   npm test
   ```

3. Run example CLI:
   ```bash
   npx ts-node src/index.ts
   ```

## Assumptions

- **Input Validity**: The system assumes input cards are valid and drawn from a single standard 52-card deck. No duplicate cards validation is performed globally (though individual card parsing validates format).
- **Tie-Breaks**: Standard Wikipedia poker hand rankings are used.
- **Card Format**: Supports symbol (A♣) and letter (Ac) formats.

## Output Ordering

The chosen 5 cards are returned in the following order:

- **Straight / Straight Flush**: Highest card to lowest (A,K,Q,J,10). For Wheel (A-5), ordered 5,4,3,2,A.
- **Four of a Kind**: The four quad cards first, then the kicker.
- **Full House**: The three triplet cards first, then the two pair cards.
- **Flush / High Card**: Descending rank order.
- **Three of a Kind**: The three triplet cards first, then the two kickers in descending order.
- **Two Pair**: Top pair cards, then bottom pair cards, then kicker.
- **One Pair**: Pair cards, then three kickers in descending order.

## Design

The core logic is in `HandEvaluator`. It sorts 7 cards, checks categories from highest to lowest, and returns the first match with the best 5-card combination.
`PokerGame` orchestrates the game by evaluating each player's hand against the board and determining the winner(s).
"
