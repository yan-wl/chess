import * as readline from 'readline';
import ChessGame from './ChessGame';

const IO = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const chessGame = new ChessGame();

IO.write('Starting position:\n');
IO.write(chessGame.state);
IO.write('\n');

const EXIT_COMMAND = 'quit';

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    IO.question(question, (answer) => resolve(answer));
  });
}

async function start() {
  while (true) {
    const answer = await prompt('Enter your move: ');

    if (answer === EXIT_COMMAND) {
      IO.close();
      break;
    }

    try {
      chessGame.execute(answer);
      IO.write(chessGame.state);
      IO.write('\n');
    } catch (error) {
      IO.write(error.stack);
      IO.write(error.message);
      IO.write('\n');
    }
  }
}

start();
