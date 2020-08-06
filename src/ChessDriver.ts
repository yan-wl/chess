import * as readline from 'readline';
import ChessGame from './ChessGame';

const IO = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const chessGame = new ChessGame();

const EXIT_COMMAND = 'quit';

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    IO.question(question, (answer) => resolve(answer));
  });
}

async function start() {
  while (true) {
    IO.write(chessGame.state);
    IO.write('\n');

    const answer = await prompt('Enter your move: ');

    if (answer === EXIT_COMMAND) {
      IO.close();
      break;
    }

    try {
      chessGame.execute(answer);
    } catch (error) {
      if (process.env.NODE_ENV === 'dev') {
        IO.write(error.stack);
      }
      IO.write(error.message);
      IO.write('\n');
    }
  }
}

start();
