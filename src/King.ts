import ChessPiece from './ChessPiece';
import KingMoveContext from './KingMoveContext';
import { Move } from './Move';
import { RelativePosition } from './RelativePosition';
import { MoveEffect } from './MoveEffect';
import { PieceType } from './PieceType';

export default class King extends ChessPiece {
  get type(): PieceType {
    return PieceType.KING;
  }

  clone(): King {
    const clone = new King(this.colour);
    clone.position = this.position;
    return clone;
  }

  getNonAttackingMoves(moveContext: KingMoveContext): Move[] {
    const nonAttackingMoves: Move[] = [];

    if (moveContext.leftCastleIsAllowed()) {
      nonAttackingMoves.push({
        steps: [RelativePosition.LEFT, RelativePosition.LEFT],
        effect: MoveEffect.LEFT_CASTLE
      });
    }

    if (moveContext.rightCastleIsAllowed()) {
      nonAttackingMoves.push({
        steps: [RelativePosition.RIGHT, RelativePosition.RIGHT],
        effect: MoveEffect.RIGHT_CASTLE
      });
    }

    return nonAttackingMoves;
  }

  getAttackingMoves(moveContext: KingMoveContext): Move[] {
    const attackingMoves: Move[] = [];

    // NOTE: Using === false is intentional to account for undefined.
    if (moveContext.hasAllyInFront() === false) {
      attackingMoves.push({
        steps: [RelativePosition.FRONT],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyBehind() === false) {
      attackingMoves.push({
        steps: [RelativePosition.BACK],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnLeft() === false) {
      attackingMoves.push({
        steps: [RelativePosition.LEFT],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyOnRight() === false) {
      attackingMoves.push({
        steps: [RelativePosition.RIGHT],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyFrontLeft() === false) {
      attackingMoves.push({
        steps: [RelativePosition.FRONT, RelativePosition.LEFT],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyFrontRight() === false) {
      attackingMoves.push({
        steps: [RelativePosition.FRONT, RelativePosition.RIGHT],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyBackLeft() === false) {
      attackingMoves.push({
        steps: [RelativePosition.BACK, RelativePosition.LEFT],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.hasAllyBackRight() === false) {
      attackingMoves.push({
        steps: [RelativePosition.BACK, RelativePosition.RIGHT],
        effect: MoveEffect.REGULAR
      });
    }

    return attackingMoves;
  }
}
