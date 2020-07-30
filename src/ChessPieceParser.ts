import ChessPiece from './ChessPiece';
import Pawn from './Pawn';
import King from './King';
import Queen from './Queen';
import Rook from './Rook';
import Bishop from './Bishop';
import Knight from './Knight';
import PieceColourParser from './PieceColourParser';

function isValidRepresentation(representation: string): boolean {
  const re = /^[wb][kqrbnpo]$/i;
  return re.test(representation);
}

/**
 * To parse a serialized chess piece
 *
 * @remarks Implemented such that parse(serialize(piece)) === piece
 *
 * @param representation string that represents a chess piece
 * @returns the corresponding chess piece if valid, else throws an error
 */
function parse(representation: string): ChessPiece | null {
  if (!isValidRepresentation(representation)) {
    throw Error('Invalid chess piece.');
  }

  const [colour, type] = representation.split('');

  switch (type.toUpperCase()) {
    case 'K':
      return new King(PieceColourParser.parse(colour));
    case 'Q':
      return new Queen(PieceColourParser.parse(colour));
    case 'R':
      return new Rook(PieceColourParser.parse(colour));
    case 'B':
      return new Bishop(PieceColourParser.parse(colour));
    case 'N':
      return new Knight(PieceColourParser.parse(colour));
    case 'P':
      return new Pawn(PieceColourParser.parse(colour));
    case 'O':
      return null;
    default:
      throw Error('Incorrect parser validation.');
  }
}

/**
 * To serialize a chess piece
 *
 * @remarks Implemented such that piece === parse(serialize(piece))
 *
 * @param piece chess piece to serialize
 * @returns string that represents the chess piece
 */
function serialize(piece: ChessPiece | null): string {
  // Colour does not matter for null pieces; white is arbitrarily chosen
  if (piece === null) {
    return 'WO';
  }

  const colour: string = PieceColourParser.serialize(piece.colour);
  let type: string;

  if (piece instanceof King) {
    type = 'K';
  } else if (piece instanceof Queen) {
    type = 'Q';
  } else if (piece instanceof Rook) {
    type = 'R';
  } else if (piece instanceof Bishop) {
    type = 'B';
  } else if (piece instanceof Knight) {
    type = 'N';
  } else if (piece instanceof Pawn) {
    type = 'P';
  } else {
    throw Error('Unknown piece type.');
  }

  return `${colour}${type}`;
}

export default {
  parse,
  serialize
};
