import ChessPiece from "./ChessPiece";
import MoveContext from "./MoveContext";
import { BoardMove } from "./BoardMove";

export default class Queen extends ChessPiece {
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
    return 'Q';
  }
}