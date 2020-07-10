import ChessPiece from "./ChessPiece";
import MoveContext from "./MoveContext";
import { BoardMove } from "./BoardMove";

export default class InvisiblePiece extends ChessPiece {
  constructor() {
    super();
  }

  isOpaque(): boolean {
    return false;
  }

  getPossibleMoves(moveContext: MoveContext): BoardMove[] {
    return [];
  }

  toString(): string {
    return '0';
  }
}