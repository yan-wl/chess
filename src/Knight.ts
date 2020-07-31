import ChessPiece from './ChessPiece';
import KnightMoveContext from './KnightMoveContext';
import { Move } from './Move';
import { PieceColour } from './PieceColour';
import { RelativePosition } from './RelativePosition';
import { MoveEffect } from './MoveEffect';
import { PieceType } from './PieceType';

export default class Knight extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  get type(): PieceType {
    return PieceType.KNIGHT;
  }

  getPossibleMoves(moveContext: KnightMoveContext): Move[] {
    const possibleMoves: Move[] = [];

    // NOTE: Using === false is intentional to account for undefined.

    if (moveContext.hasAllyOnOne() === false) {
      possibleMoves.push({
        steps: [
          RelativePosition.FRONT,
          RelativePosition.FRONT,
          RelativePosition.RIGHT
        ],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnTwo() === false) {
      possibleMoves.push({
        steps: [
          RelativePosition.RIGHT,
          RelativePosition.RIGHT,
          RelativePosition.FRONT
        ],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnFour() === false) {
      possibleMoves.push({
        steps: [
          RelativePosition.RIGHT,
          RelativePosition.RIGHT,
          RelativePosition.BACK
        ],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnFive() === false) {
      possibleMoves.push({
        steps: [
          RelativePosition.BACK,
          RelativePosition.BACK,
          RelativePosition.RIGHT
        ],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnSeven() === false) {
      possibleMoves.push({
        steps: [
          RelativePosition.BACK,
          RelativePosition.BACK,
          RelativePosition.LEFT
        ],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnEight() === false) {
      possibleMoves.push({
        steps: [
          RelativePosition.LEFT,
          RelativePosition.LEFT,
          RelativePosition.BACK
        ],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnTen() === false) {
      possibleMoves.push({
        steps: [
          RelativePosition.LEFT,
          RelativePosition.LEFT,
          RelativePosition.FRONT
        ],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnEleven() === false) {
      possibleMoves.push({
        steps: [
          RelativePosition.FRONT,
          RelativePosition.FRONT,
          RelativePosition.LEFT
        ],
        effect: MoveEffect.REGULAR
      });
    }

    return possibleMoves;
  }
}
