import ChessPiece from './ChessPiece';
import RookMoveContext from './RookMoveContext';
import { BoardMove } from './BoardMove';
import { PieceColour } from './PieceColour';
import { PrimitiveMove } from './PrimitiveMove';

export default class Rook extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  getPossibleMoves(moveContext: RookMoveContext): BoardMove[] {
    const possibleMoves: BoardMove[] = [];

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenFrontLane(i)) {
        possibleMoves.push(Array(i).fill(PrimitiveMove.UP));
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenBackLane(i)) {
        possibleMoves.push(Array(i).fill(PrimitiveMove.DOWN));
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenLeftLane(i)) {
        possibleMoves.push(Array(i).fill(PrimitiveMove.LEFT));
      }
    }

    for (let i = 1; i < 8; i++) {
      if (moveContext.hasOpenRightLane(i)) {
        possibleMoves.push(Array(i).fill(PrimitiveMove.RIGHT));
      }
    }

    return possibleMoves;
  }
}
