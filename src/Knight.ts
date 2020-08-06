import ChessPiece from './ChessPiece';
import KnightMoveContext from './KnightMoveContext';
import { Move } from './Move';
import { RelativePosition } from './RelativePosition';
import { MoveEffect } from './MoveEffect';
import { PieceType } from './PieceType';

export default class Knight extends ChessPiece {
  get type(): PieceType {
    return PieceType.KNIGHT;
  }

  clone(): Knight {
    const clone = new Knight(this.colour);
    clone.position = this.position;
    clone.id = this.id;
    return clone;
  }

  getNonAttackingMoves(): Move[] {
    return [];
  }

  getAttackingMoves(moveContext: KnightMoveContext): Move[] {
    const attackingMoves: Move[] = [];

    // NOTE: Using === false is intentional to account for undefined.

    if (moveContext.hasAllyOnOne() === false) {
      attackingMoves.push({
        steps: [
          RelativePosition.FRONT,
          RelativePosition.FRONT,
          RelativePosition.RIGHT
        ],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnTwo() === false) {
      attackingMoves.push({
        steps: [
          RelativePosition.RIGHT,
          RelativePosition.RIGHT,
          RelativePosition.FRONT
        ],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnFour() === false) {
      attackingMoves.push({
        steps: [
          RelativePosition.RIGHT,
          RelativePosition.RIGHT,
          RelativePosition.BACK
        ],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnFive() === false) {
      attackingMoves.push({
        steps: [
          RelativePosition.BACK,
          RelativePosition.BACK,
          RelativePosition.RIGHT
        ],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnSeven() === false) {
      attackingMoves.push({
        steps: [
          RelativePosition.BACK,
          RelativePosition.BACK,
          RelativePosition.LEFT
        ],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnEight() === false) {
      attackingMoves.push({
        steps: [
          RelativePosition.LEFT,
          RelativePosition.LEFT,
          RelativePosition.BACK
        ],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnTen() === false) {
      attackingMoves.push({
        steps: [
          RelativePosition.LEFT,
          RelativePosition.LEFT,
          RelativePosition.FRONT
        ],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnEleven() === false) {
      attackingMoves.push({
        steps: [
          RelativePosition.FRONT,
          RelativePosition.FRONT,
          RelativePosition.LEFT
        ],
        effect: MoveEffect.REGULAR
      });
    }

    return attackingMoves;
  }
}
