import ChessPiece from "./ChessPiece";
import MoveContext from "./MoveContext";
import { BoardMove } from "./BoardMove";
import { PieceColour } from "./PieceColour";

export default class Knight extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }
  
  getPossibleMoves(moveContext: MoveContext): BoardMove[] {
    return [];
  }
}