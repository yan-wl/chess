import ChessPiece from './ChessPiece';
import RookMoveContext from './RookMoveContext';
import { Move } from './Move';
import { RelativePosition } from './RelativePosition';
import { MoveEffect } from './MoveEffect';
import { PieceType } from './PieceType';

export default class Rook extends ChessPiece {
  get type(): PieceType {
    return PieceType.ROOK;
  }

  clone(): Rook {
    const clone = new Rook(this.colour);
    clone.position = this.position;
    return clone;
  }

  getNonAttackingMoves(): Move[] {
    return [];
  }

  getAttackingMoves(moveContext: RookMoveContext): Move[] {
    const attackingMoves: Move[] = [];

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenFrontLane(i)) {
        attackingMoves.push({
          steps: Array(i).fill(RelativePosition.FRONT),
          effect: MoveEffect.REGULAR
        });
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenBackLane(i)) {
        attackingMoves.push({
          steps: Array(i).fill(RelativePosition.BACK),
          effect: MoveEffect.REGULAR
        });
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenLeftLane(i)) {
        attackingMoves.push({
          steps: Array(i).fill(RelativePosition.LEFT),
          effect: MoveEffect.REGULAR
        });
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenRightLane(i)) {
        attackingMoves.push({
          steps: Array(i).fill(RelativePosition.RIGHT),
          effect: MoveEffect.REGULAR
        });
      }
    }

    return attackingMoves;
  }
}
