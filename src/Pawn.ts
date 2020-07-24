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

    if (!moveContext.hasPieceInFrontOfPawn()) {
      possibleMoves.push([PrimitiveMove.UP]);
    }

    // if (
    //   moveContext.pawnHasNotMoved() &&
    //   !moveContext.hasPieceInFrontOfPawn() &&
    //   !moveContext.hasPieceTwoSquaresInFrontOfPawn()
    // ) {
    //   possibleMoves.push([PrimitiveMove.UP, PrimitiveMove.UP]);
    // }

    // if (moveContext.leftEnPassantIsAllowed()) {
    //   possibleMoves.push([PrimitiveMove.UP, PrimitiveMove.LEFT]);
    // }

    // if (moveContext.rightEnPassantIsAllowed()) {
    //   possibleMoves.push([PrimitiveMove.UP, PrimitiveMove.RIGHT]);
    // }

    // if (moveContext.hasEnemyOnDiagonalLeft()) {
    //   possibleMoves.push([PrimitiveMove.UP, PrimitiveMove.LEFT]);
    // }

    // if (moveContext.hasEnemyOnDiagonalRight()) {
    //   possibleMoves.push([PrimitiveMove.UP, PrimitiveMove.RIGHT]);
    // }

    return possibleMoves;
  }
}
