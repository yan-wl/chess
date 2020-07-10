import ChessConfiguration from "./ChessConfiguration";
import ChessPieceParser from "./ChessPieceParser";
import ChessSquare from "./ChessSquare";
import ChessPosition from "./ChessPosition";
import ChessPositionColumnParser from "./ChessPositionColumnParser";
import ChessPositionRowParser from "./ChessPositionRowParser";

export const REGULAR_CONFIG = `
bRbNbBbQbKbBbNbR
bPbPbPbPbPbPbPbP
b0b0b0b0b0b0b0b0
b0b0b0b0b0b0b0b0
w0w0w0w0w0w0w0w0
w0w0w0w0w0w0w0w0
wPwPwPwPwPwPwPwP
wRwNwBwKwQwBwNwR
`;

function isValidRepresentation(representation: string): boolean {
  const re = /^\s*(((w|b)(K|k|Q|q|R|r|B|b|N|n|P|p|0)){8}\s+){7}((w|b)(K|k|Q|q|R|r|B|b|N|n|P|p|0)){8}\s*$/;
  return re.test(representation);
}

function parse(representation: string): ChessConfiguration {
  if (!isValidRepresentation(representation)) {
    throw Error('Invalid chess configuration.');
  }
  const orderedPieces = representation.replace(/\s/g, '').match(/.{2}/g);
  
  if (orderedPieces === null) {
    throw Error('Invalid chess configuration.');
  }

  const blackSquares: ChessSquare[] = [];
  const whiteSquares: ChessSquare[] = [];

  let index = 0;

  ['8', '7', '6', '5', '4', '3', '2', '1'].forEach(row => {
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach(column => {
      const [colour, piece] = orderedPieces[index].split('') as ['w' | 'b', 'K' | 'k' | 'Q' | 'q' | 'R' | 'r' | 'B' | 'b' | 'N' | 'n' | 'P' | 'p' | '0'];
      const chessSquare = new ChessSquare(new ChessPosition(ChessPositionColumnParser.parse(column), ChessPositionRowParser.parse(row)), ChessPieceParser.parse(piece));
      if (colour === 'w') {
        whiteSquares.push(chessSquare);
      } else {
        blackSquares.push(chessSquare);
      }
      index++;
    });
  });

  return new ChessConfiguration(blackSquares, whiteSquares);
}

export default {
  parse
};