import ChessPiece from './ChessPiece';
import { Move } from './Move';
import PawnMoveContext from './PawnMoveContext';
import { RelativePosition } from './RelativePosition';
import { PieceColour } from './PieceColour';
import { MoveEffect } from './MoveEffect';

export default class Pawn extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  getPossibleMoves(moveContext: PawnMoveContext): Move[] {
    const possibleMoves: Move[] = [];

    // NOTE: Using === false is intentional to account for undefined.

    if (moveContext.hasPieceInFront() === false) {
      possibleMoves.push({
        steps: [RelativePosition.FRONT],
        effect: MoveEffect.REGULAR
      });
    }

    if (
      moveContext.pawnHasNotMoved() &&
      moveContext.hasPieceInFront() === false &&
      moveContext.hasPieceTwoSquaresInFront() === false
    ) {
      possibleMoves.push({
        steps: [RelativePosition.FRONT, RelativePosition.FRONT],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.leftEnPassantIsAllowed()) {
      possibleMoves.push({
        steps: [RelativePosition.FRONT, RelativePosition.LEFT],
        effect: MoveEffect.EN_PASSANT
      });
    }

    if (moveContext.rightEnPassantIsAllowed()) {
      possibleMoves.push({
        steps: [RelativePosition.FRONT, RelativePosition.RIGHT],
        effect: MoveEffect.EN_PASSANT
      });
    }

    if (moveContext.hasEnemyFrontLeft()) {
      possibleMoves.push({
        steps: [RelativePosition.FRONT, RelativePosition.LEFT],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasEnemyFrontRight()) {
      possibleMoves.push({
        steps: [RelativePosition.FRONT, RelativePosition.RIGHT],
        effect: MoveEffect.REGULAR
      });
    }

    return possibleMoves;
  }
}
