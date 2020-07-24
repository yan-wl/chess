import ChessPiece from './ChessPiece';
import { Move } from './Move';
import PawnMoveContext from './PawnMoveContext';
import { RelativePosition } from './RelativePosition';
import { PieceColour } from './PieceColour';

export default class Pawn extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  getPossibleMoves(moveContext: PawnMoveContext): Move[] {
    const possibleMoves: Move[] = [];

    // NOTE: Using === false is intentional to account for undefined.

    if (moveContext.hasPieceInFront() === false) {
      possibleMoves.push([RelativePosition.FRONT]);
    }

    if (
      moveContext.pawnHasNotMoved() &&
      moveContext.hasPieceInFront() === false &&
      moveContext.hasPieceTwoSquaresInFront() === false
    ) {
      possibleMoves.push([RelativePosition.FRONT, RelativePosition.FRONT]);
    }

    if (moveContext.leftEnPassantIsAllowed()) {
      possibleMoves.push([RelativePosition.FRONT, RelativePosition.LEFT]);
    }

    if (moveContext.rightEnPassantIsAllowed()) {
      possibleMoves.push([RelativePosition.FRONT, RelativePosition.RIGHT]);
    }

    if (moveContext.hasEnemyFrontLeft()) {
      possibleMoves.push([RelativePosition.FRONT, RelativePosition.LEFT]);
    }

    if (moveContext.hasEnemyFrontRight()) {
      possibleMoves.push([RelativePosition.FRONT, RelativePosition.RIGHT]);
    }

    return possibleMoves;
  }
}
