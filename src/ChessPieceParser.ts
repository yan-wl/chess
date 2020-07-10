import ChessPiece from "./ChessPiece";
import Pawn from "./Pawn";
import King from "./King";
import Queen from "./Queen";
import Rook from "./Rook";
import Bishop from "./Bishop";
import Knight from "./Knight";
import InvisiblePiece from "./InvisiblePiece";

function parse(representation: string): ChessPiece {
  switch(representation.toUpperCase()) {
    case 'K':
      return new King();
    case 'Q':
      return new Queen();
    case 'R':
      return new Rook();
    case 'B':
      return new Bishop();
    case 'N':
      return new Knight();
    case 'P':
      return new Pawn();
    case '0':
      return new InvisiblePiece();
    default:
      throw Error('Invalid piece name.');
  }
}

export default {
  parse
};