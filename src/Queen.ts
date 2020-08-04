import ChessPiece from './ChessPiece';
import QueenMoveContext from './QueenMoveContext';
import { Move } from './Move';
import { RelativePosition } from './RelativePosition';
import { MoveEffect } from './MoveEffect';
import { PieceType } from './PieceType';

export default class Queen extends ChessPiece {
  get type(): PieceType {
    return PieceType.QUEEN;
  }

  clone(): Queen {
    const clone = new Queen(this.colour);
    clone.position = this.position;
    return clone;
  }

  getNonAttackingMoves(): Move[] {
    return [];
  }

  getAttackingMoves(moveContext: QueenMoveContext): Move[] {
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

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenNorthEastDiagonal(i)) {
        attackingMoves.push({
          // NOTE: fill(null) is necessary as mapping is not allowed on empty slots
          steps: Array(i * 2)
            .fill(null)
            .map((_, index) =>
              index % 2 === 0 ? RelativePosition.FRONT : RelativePosition.RIGHT
            ),
          effect: MoveEffect.REGULAR
        });
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenSouthEastDiagonal(i)) {
        attackingMoves.push({
          steps: Array(i * 2)
            .fill(null)
            .map((_, index) =>
              index % 2 === 0 ? RelativePosition.BACK : RelativePosition.RIGHT
            ),
          effect: MoveEffect.REGULAR
        });
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenSouthWestDiagonal(i)) {
        attackingMoves.push({
          steps: Array(i * 2)
            .fill(null)
            .map((_, index) =>
              index % 2 === 0 ? RelativePosition.BACK : RelativePosition.LEFT
            ),
          effect: MoveEffect.REGULAR
        });
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenNorthWestDiagonal(i)) {
        attackingMoves.push({
          steps: Array(i * 2)
            .fill(null)
            .map((_, index) =>
              index % 2 === 0 ? RelativePosition.FRONT : RelativePosition.LEFT
            ),
          effect: MoveEffect.REGULAR
        });
      }
    }

    return attackingMoves;
  }
}
