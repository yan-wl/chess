import * as readline from 'readline';
import ChessBoard from './ChessBoard';
import ChessMoveParser from './ChessMoveParser';
import ChessConfigurationParser from './ChessConfigurationParser';
import { REGULAR_CONFIG, PROMOTION_TEST } from './ConfigProvider';

const IO = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// const initConfig = REGULAR_CONFIG;
const initConfig = PROMOTION_TEST;

const chessBoard = new ChessBoard(ChessConfigurationParser.parse(initConfig));

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
      IO.write(error.stack);
      IO.write(error.message);
      IO.write('\n');
    }
  }
}

start();
