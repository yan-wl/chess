import ChessPiece from './ChessPiece';
import KingMoveContext from './KingMoveContext';
import { BoardMove } from './BoardMove';
import { PieceColour } from './PieceColour';
import { PrimitiveMove } from './PrimitiveMove';

export default class King extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  getPossibleMoves(moveContext: KingMoveContext): BoardMove[] {
    const possibleMoves: BoardMove[] = [];

    // NOTE: Using === false is intentional to account for undefined.

    if (moveContext.hasAllyInFront() === false) {
      possibleMoves.push([PrimitiveMove.UP]);
    }

    if (moveContext.hasAllyBehind() === false) {
      possibleMoves.push([PrimitiveMove.DOWN]);
    }

    if (moveContext.hasAllyOnLeft() === false) {
      possibleMoves.push([PrimitiveMove.LEFT]);
    }

    if (moveContext.hasAllyOnRight() === false) {
      possibleMoves.push([PrimitiveMove.RIGHT]);
    }

    if (moveContext.hasAllyFrontLeft() === false) {
      possibleMoves.push([PrimitiveMove.UP, PrimitiveMove.LEFT]);
    }

    if (moveContext.hasAllyFrontRight() === false) {
      possibleMoves.push([PrimitiveMove.UP, PrimitiveMove.RIGHT]);
    }

    if (moveContext.hasAllyBackLeft() === false) {
      possibleMoves.push([PrimitiveMove.DOWN, PrimitiveMove.LEFT]);
    }

    if (moveContext.hasAllyBackRight() === false) {
      possibleMoves.push([PrimitiveMove.DOWN, PrimitiveMove.RIGHT]);
    }

    return possibleMoves;
  }
}
