import ChessPiece from './ChessPiece';
import KingMoveContext from './KingMoveContext';
import { Move } from './Move';
import { PieceColour } from './PieceColour';
import { RelativePosition } from './RelativePosition';

export default class King extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  getPossibleMoves(moveContext: KingMoveContext): Move[] {
    const possibleMoves: Move[] = [];

    // NOTE: Using === false is intentional to account for undefined.

    if (moveContext.hasAllyInFront() === false) {
      possibleMoves.push([RelativePosition.FRONT]);
    }

    if (moveContext.hasAllyBehind() === false) {
      possibleMoves.push([RelativePosition.BACK]);
    }

    if (moveContext.hasAllyOnLeft() === false) {
      possibleMoves.push([RelativePosition.LEFT]);
    }

    if (moveContext.hasAllyOnRight() === false) {
      possibleMoves.push([RelativePosition.RIGHT]);
    }

    if (moveContext.hasAllyFrontLeft() === false) {
      possibleMoves.push([RelativePosition.FRONT, RelativePosition.LEFT]);
    }

    if (moveContext.hasAllyFrontRight() === false) {
      possibleMoves.push([RelativePosition.FRONT, RelativePosition.RIGHT]);
    }

    if (moveContext.hasAllyBackLeft() === false) {
      possibleMoves.push([RelativePosition.BACK, RelativePosition.LEFT]);
    }

    if (moveContext.hasAllyBackRight() === false) {
      possibleMoves.push([RelativePosition.BACK, RelativePosition.RIGHT]);
    }

    return possibleMoves;
  }
}
