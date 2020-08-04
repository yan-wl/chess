import PieceColourParser from './PieceColourParser';
import ChessPiece from './ChessPiece';
import Pawn from './Pawn';
import King from './King';
import Queen from './Queen';
import Rook from './Rook';
import Bishop from './Bishop';
import Knight from './Knight';
import NullPiece from './NullPiece';
import { PieceType } from './PieceType';

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
function parse(representation: string): ChessPiece {
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
      return new NullPiece(PieceColourParser.parse(colour));
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
function serialize(piece: ChessPiece): string {
  const colour: string = PieceColourParser.serialize(piece.colour);
  let type: string;

  switch (piece.type) {
    case PieceType.BISHOP:
      type = 'B';
      break;
    case PieceType.KING:
      type = 'K';
      break;
    case PieceType.KNIGHT:
      type = 'N';
      break;
    case PieceType.NULL:
      type = 'O';
      break;
    case PieceType.PAWN:
      type = 'P';
      break;
    case PieceType.QUEEN:
      type = 'Q';
      break;
    case PieceType.ROOK:
      type = 'R';
      break;
  }

  return `${colour}${type}`;
}

export default {
  parse,
  serialize
};
