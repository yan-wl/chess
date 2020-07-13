import ChessPiece from "./ChessPiece";
import Pawn from "./Pawn";
import King from "./King";
import Queen from "./Queen";
import Rook from "./Rook";
import Bishop from "./Bishop";
import Knight from "./Knight";
import PieceColourParser from "./PieceColourParser";

function isValidRepresentation(representation: string): boolean {
  const re = /^[wb][kqrbnpo]$/i;
  return re.test(representation);
}

function parse(representation: string): ChessPiece | null {
  if (!isValidRepresentation(representation)) {
    throw Error('Invalid chess piece.');
  }

  const [colour, type] = representation.split('');

  switch(type.toUpperCase()) {
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

export default {
  parse
};