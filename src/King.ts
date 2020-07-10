import ChessPiece from "./ChessPiece";
import { BoardMove } from "./BoardMove";
import MoveContext from "./MoveContext";

export default class King extends ChessPiece {
  constructor() {
    super();
  }

  isOpaque(): boolean {
    return true;
  }

  getPossibleMoves(moveContext: MoveContext): BoardMove[] {
    return [];
  }

  toString(): string {
    return 'K';
  }
}