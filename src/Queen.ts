import ChessPiece from './ChessPiece';
import QueenMoveContext from './QueenMoveContext';
import { Move } from './Move';
import { PieceColour } from './PieceColour';
import { RelativePosition } from './RelativePosition';

export default class Queen extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  getPossibleMoves(moveContext: QueenMoveContext): Move[] {
    const possibleMoves: Move[] = [];

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenFrontLane(i)) {
        possibleMoves.push(Array(i).fill(RelativePosition.FRONT));
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenBackLane(i)) {
        possibleMoves.push(Array(i).fill(RelativePosition.BACK));
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenLeftLane(i)) {
        possibleMoves.push(Array(i).fill(RelativePosition.LEFT));
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenRightLane(i)) {
        possibleMoves.push(Array(i).fill(RelativePosition.RIGHT));
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenNorthEastDiagonal(i)) {
        possibleMoves.push(
          // NOTE: fill(null) is necessary as mapping is not allowed on empty slots
          Array(i * 2)
            .fill(null)
            .map((_, index) => {
              if (index % 2 === 0) {
                return RelativePosition.FRONT;
              } else {
                return RelativePosition.RIGHT;
              }
            })
        );
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenSouthEastDiagonal(i)) {
        possibleMoves.push(
          Array(i * 2)
            .fill(null)
            .map((_, index) => {
              if (index % 2 === 0) {
                return RelativePosition.BACK;
              } else {
                return RelativePosition.RIGHT;
              }
            })
        );
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenSouthWestDiagonal(i)) {
        possibleMoves.push(
          Array(i * 2)
            .fill(null)
            .map((_, index) => {
              if (index % 2 === 0) {
                return RelativePosition.BACK;
              } else {
                return RelativePosition.LEFT;
              }
            })
        );
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenNorthWestDiagonal(i)) {
        possibleMoves.push(
          Array(i * 2)
            .fill(null)
            .map((_, index) => {
              if (index % 2 === 0) {
                return RelativePosition.FRONT;
              } else {
                return RelativePosition.LEFT;
              }
            })
        );
      }
    }

    return possibleMoves;
  }
}
