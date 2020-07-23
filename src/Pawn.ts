import ChessPiece from "./ChessPiece";
import { BoardMove } from "./BoardMove";
import PawnMoveContext from "./PawnMoveContext";
import { PrimitiveMove } from "./PrimitiveMove";
import { PieceColour } from "./PieceColour";

export default class Pawn extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  getPossibleMoves(moveContext: PawnMoveContext): BoardMove[] {
    const possibleMoves: BoardMove[] = [];

    if (!moveContext.hasPieceInFrontOfPawn()) {
      possibleMoves.push([PrimitiveMove.UP]);
    }

    if (moveContext.pawnHasNotMoved()) {
      possibleMoves.push([PrimitiveMove.UP, PrimitiveMove.UP]);
    }

    return possibleMoves;
  }
}