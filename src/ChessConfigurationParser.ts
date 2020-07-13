import ChessConfiguration from "./ChessConfiguration";
import ChessPieceParser from "./ChessPieceParser";
import ChessPosition from "./ChessPosition";
import ChessPositionColumnParser from "./ChessPositionColumnParser";
import ChessPositionRowParser from "./ChessPositionRowParser";
import ChessPiece from "./ChessPiece";

export const REGULAR_CONFIG = `
bRbNbBbQbKbBbNbR
bPbPbPbPbPbPbPbP
bObObObObObObObO
bObObObObObObObO
wOwOwOwOwOwOwOwO
wOwOwOwOwOwOwOwO
wPwPwPwPwPwPwPwP
wRwNwBwKwQwBwNwR
`;

function isValidRepresentation(representation: string): boolean {
  const re = /^\s*(([wb][kqrbnpo]){8}\s+){7}([wb][kqrbnpo]){8}\s*$/i;
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

  let index = 0;
  const positionMap = new Map<ChessPosition, ChessPiece | null>();

  ['8', '7', '6', '5', '4', '3', '2', '1'].forEach(row => {
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach(column => {
      const pieceRepr = orderedPieces[index];

      const position = ChessPosition.at(ChessPositionColumnParser.parse(column), ChessPositionRowParser.parse(row));
      const piece = ChessPieceParser.parse(pieceRepr);

      positionMap.set(position, piece);

      index++;
    });
  });

  return new ChessConfiguration(positionMap);
}

export default {
  parse
};