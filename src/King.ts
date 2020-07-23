import ChessPiece from "./ChessPiece";
import { BoardMove } from "./BoardMove";
import MoveContext from "./MoveContext";
import { PieceColour } from "./PieceColour";

export default class King extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  getPossibleMoves(moveContext: MoveContext): BoardMove[] {
    return [];
  }
}