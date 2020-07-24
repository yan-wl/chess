import ChessPiece from './ChessPiece';
import BishopMoveContext from './BishopMoveContext';
import { Move } from './Move';
import { PieceColour } from './PieceColour';
import { RelativePosition } from './RelativePosition';

export default class Bishop extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  getPossibleMoves(moveContext: BishopMoveContext): Move[] {
    const possibleMoves: Move[] = [];

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
