import ChessPiece from './ChessPiece';
import KingMoveContext from './KingMoveContext';
import { Move } from './Move';
import { PieceColour } from './PieceColour';
import { RelativePosition } from './RelativePosition';
import { MoveEffect } from './MoveEffect';

export default class King extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  getPossibleMoves(moveContext: KingMoveContext): Move[] {
    const possibleMoves: Move[] = [];

    // NOTE: Using === false is intentional to account for undefined.

    if (moveContext.hasAllyInFront() === false) {
      possibleMoves.push({
        steps: [RelativePosition.FRONT],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyBehind() === false) {
      possibleMoves.push({
        steps: [RelativePosition.BACK],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnLeft() === false) {
      possibleMoves.push({
        steps: [RelativePosition.LEFT],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnRight() === false) {
      possibleMoves.push({
        steps: [RelativePosition.RIGHT],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyFrontLeft() === false) {
      possibleMoves.push({
        steps: [RelativePosition.FRONT, RelativePosition.LEFT],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyFrontRight() === false) {
      possibleMoves.push({
        steps: [RelativePosition.FRONT, RelativePosition.RIGHT],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyBackLeft() === false) {
      possibleMoves.push({
        steps: [RelativePosition.BACK, RelativePosition.LEFT],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyBackRight() === false) {
      possibleMoves.push({
        steps: [RelativePosition.BACK, RelativePosition.RIGHT],
        effect: MoveEffect.REGULAR
      });
    }

    return possibleMoves;
  }
}
