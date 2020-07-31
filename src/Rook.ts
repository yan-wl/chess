import ChessPiece from './ChessPiece';
import RookMoveContext from './RookMoveContext';
import { Move } from './Move';
import { PieceColour } from './PieceColour';
import { RelativePosition } from './RelativePosition';
import { MoveEffect } from './MoveEffect';
import { PieceType } from './PieceType';

export default class Rook extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  get type(): PieceType {
    return PieceType.ROOK;
  }

  getPossibleMoves(moveContext: RookMoveContext): Move[] {
    const possibleMoves: Move[] = [];

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenFrontLane(i)) {
        possibleMoves.push({
          steps: Array(i).fill(RelativePosition.FRONT),
          effect: MoveEffect.REGULAR
        });
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenBackLane(i)) {
        possibleMoves.push({
          steps: Array(i).fill(RelativePosition.BACK),
          effect: MoveEffect.REGULAR
        });
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenLeftLane(i)) {
        possibleMoves.push({
          steps: Array(i).fill(RelativePosition.LEFT),
          effect: MoveEffect.REGULAR
        });
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenRightLane(i)) {
        possibleMoves.push({
          steps: Array(i).fill(RelativePosition.RIGHT),
          effect: MoveEffect.REGULAR
        });
      }
    }

    return possibleMoves;
  }
}
