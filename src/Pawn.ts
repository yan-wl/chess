import ChessPiece from "./ChessPiece";
import { BoardMove } from "./BoardMove";
import PawnMoveContext from "./PawnMoveContext";
import { PrimitiveMove } from "./PrimitiveMove";

export default class Pawn extends ChessPiece {
  constructor() {
    super();
  }

  isOpaque(): boolean {
    return true;
  }

  getPossibleMoves(moveContext: PawnMoveContext): BoardMove[] {
    const possibleMoves: BoardMove[] = [];

    if (!moveContext.hasPieceInFront()) {
      possibleMoves.push([PrimitiveMove.UP]);
    }

    return possibleMoves;
  }

  toString(): string {
    return 'P';
  }
}