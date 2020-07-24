import ChessPiece from './ChessPiece';
import QueenMoveContext from './QueenMoveContext';
import { BoardMove } from './BoardMove';
import { PieceColour } from './PieceColour';
import { PrimitiveMove } from './PrimitiveMove';

export default class Queen extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  getPossibleMoves(moveContext: QueenMoveContext): BoardMove[] {
    const possibleMoves: BoardMove[] = [];

    for (let i = 1; i < 9; i++) {
      if (moveContext.hasOpenFrontLane(i)) {
        possibleMoves.push(Array(i).fill(PrimitiveMove.UP));
      }
    }

    for (let i = 1; i < 9; i++) {
      if (moveContext.hasOpenBackLane(i)) {
        possibleMoves.push(Array(i).fill(PrimitiveMove.DOWN));
      }
    }

    for (let i = 1; i < 9; i++) {
      if (moveContext.hasOpenLeftLane(i)) {
        possibleMoves.push(Array(i).fill(PrimitiveMove.LEFT));
      }
    }

    for (let i = 1; i < 9; i++) {
      if (moveContext.hasOpenRightLane(i)) {
        possibleMoves.push(Array(i).fill(PrimitiveMove.RIGHT));
      }
    }

    for (let i = 1; i < 9; i++) {
      if (moveContext.hasOpenNorthEastDiagonal(i)) {
        possibleMoves.push(
          // NOTE: fill(null) is necessary as mapping is not allowed on empty slots
          Array(i * 2)
            .fill(null)
            .map((_, index) => {
              if (index % 2 === 0) {
                return PrimitiveMove.UP;
              } else {
                return PrimitiveMove.RIGHT;
              }
            })
        );
      }
    }

    for (let i = 1; i < 9; i++) {
      if (moveContext.hasOpenSouthEastDiagonal(i)) {
        possibleMoves.push(
          Array(i * 2)
            .fill(null)
            .map((_, index) => {
              if (index % 2 === 0) {
                return PrimitiveMove.DOWN;
              } else {
                return PrimitiveMove.RIGHT;
              }
            })
        );
      }
    }

    for (let i = 1; i < 9; i++) {
      if (moveContext.hasOpenSouthWestDiagonal(i)) {
        possibleMoves.push(
          Array(i * 2)
            .fill(null)
            .map((_, index) => {
              if (index % 2 === 0) {
                return PrimitiveMove.DOWN;
              } else {
                return PrimitiveMove.LEFT;
              }
            })
        );
      }
    }

    for (let i = 1; i < 9; i++) {
      if (moveContext.hasOpenNorthWestDiagonal(i)) {
        possibleMoves.push(
          Array(i * 2)
            .fill(null)
            .map((_, index) => {
              if (index % 2 === 0) {
                return PrimitiveMove.UP;
              } else {
                return PrimitiveMove.LEFT;
              }
            })
        );
      }
    }

    return possibleMoves;
  }
}
