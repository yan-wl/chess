import ChessPiece from './ChessPiece';
import { BoardMove } from './BoardMove';
import PawnMoveContext from './PawnMoveContext';
import { PrimitiveMove } from './PrimitiveMove';
import { PieceColour } from './PieceColour';

export default class Pawn extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  getPossibleMoves(moveContext: PawnMoveContext): BoardMove[] {
    const possibleMoves: BoardMove[] = [];

    // NOTE: Using === false is intentional to account for undefined.

    if (moveContext.hasPieceInFront() === false) {
      possibleMoves.push([PrimitiveMove.UP]);
    }

    if (
      moveContext.pawnHasNotMoved() &&
      moveContext.hasPieceInFront() === false &&
      moveContext.hasPieceTwoSquaresInFront() === false
    ) {
      possibleMoves.push([PrimitiveMove.UP, PrimitiveMove.UP]);
    }

    if (moveContext.leftEnPassantIsAllowed()) {
      possibleMoves.push([PrimitiveMove.UP, PrimitiveMove.LEFT]);
    }

    if (moveContext.rightEnPassantIsAllowed()) {
      possibleMoves.push([PrimitiveMove.UP, PrimitiveMove.RIGHT]);
    }

    if (moveContext.hasEnemyFrontLeft()) {
      possibleMoves.push([PrimitiveMove.UP, PrimitiveMove.LEFT]);
    }

    if (moveContext.hasEnemyFrontRight()) {
      possibleMoves.push([PrimitiveMove.UP, PrimitiveMove.RIGHT]);
    }

    return possibleMoves;
  }
}
