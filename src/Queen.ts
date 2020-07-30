import ChessPiece from './ChessPiece';
import QueenMoveContext from './QueenMoveContext';
import { Move } from './Move';
import { PieceColour } from './PieceColour';
import { RelativePosition } from './RelativePosition';
import { MoveEffect } from './MoveEffect';

export default class Queen extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  getPossibleMoves(moveContext: QueenMoveContext): Move[] {
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

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenNorthEastDiagonal(i)) {
        possibleMoves.push({
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
        possibleMoves.push({
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
        possibleMoves.push({
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
        possibleMoves.push({
          steps: Array(i * 2)
            .fill(null)
            .map((_, index) =>
              index % 2 === 0 ? RelativePosition.FRONT : RelativePosition.LEFT
            ),
          effect: MoveEffect.REGULAR
        });
      }
    }

    return possibleMoves;
  }
}
