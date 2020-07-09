import * as readline from 'readline';
import ChessBoard from './ChessBoard';
import ChessMoveParser from './ChessMoveParser';
import ChessConfigurationParser, { REGULAR_CONFIG } from './ChessConfigurationParser';

const IO = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chessBoard = new ChessBoard(ChessConfigurationParser.parse(REGULAR_CONFIG));

IO.write('Starting position:\n');
IO.write(chessBoard.toString());
IO.write('\n');

function askForMoves() {
  IO.question('Enter your move: ', (answer) => {
    try {
      chessBoard.move(ChessMoveParser.parse(answer));
      IO.write(chessBoard.toString());
      IO.write('\n');
    } catch (error) {
      IO.write('Invalid move.\n');
    } finally {
      askForMoves();
    }
  });
}

askForMoves();
