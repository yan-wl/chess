import * as readline from 'readline';
import ChessBoard from './ChessBoard';
import ChessMoveParser from './ChessMoveParser';
import ChessConfigurationParser from './ChessConfigurationParser';
import { REGULAR_CONFIG } from './ConfigProvider';

const IO = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const chessBoard = new ChessBoard(
  ChessConfigurationParser.parse(REGULAR_CONFIG)
);

IO.write('Starting position:\n');
IO.write(ChessConfigurationParser.serialize(chessBoard.currentConfiguration));
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
      chessBoard.move(ChessMoveParser.parse(answer));
      IO.write(
        ChessConfigurationParser.serialize(chessBoard.currentConfiguration)
      );
      IO.write('\n');
    } catch (error) {
      IO.write(error.message);
      IO.write('\n');
    }
  }
}

start();
