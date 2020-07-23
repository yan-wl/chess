import ChessPiece from './ChessPiece';
import KnightMoveContext from './KnightMoveContext';
import { BoardMove } from './BoardMove';
import { PieceColour } from './PieceColour';
import { PrimitiveMove } from './PrimitiveMove';

export default class Knight extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  getPossibleMoves(moveContext: KnightMoveContext): BoardMove[] {
    const possibleMoves: BoardMove[] = [];

    // NOTE: Using === false is intentional.

    if (moveContext.hasAllyOnOne() === false) {
      possibleMoves.push([
        PrimitiveMove.UP,
        PrimitiveMove.UP,
        PrimitiveMove.RIGHT
      ]);
    }

    if (moveContext.hasAllyOnTwo() === false) {
      possibleMoves.push([
        PrimitiveMove.RIGHT,
        PrimitiveMove.RIGHT,
        PrimitiveMove.UP
      ]);
    }

    if (moveContext.hasAllyOnFour() === false) {
      possibleMoves.push([
        PrimitiveMove.RIGHT,
        PrimitiveMove.RIGHT,
        PrimitiveMove.DOWN
      ]);
    }

    if (moveContext.hasAllyOnFive() === false) {
      possibleMoves.push([
        PrimitiveMove.DOWN,
        PrimitiveMove.DOWN,
        PrimitiveMove.RIGHT
      ]);
    }

    if (moveContext.hasAllyOnSeven() === false) {
      possibleMoves.push([
        PrimitiveMove.DOWN,
        PrimitiveMove.DOWN,
        PrimitiveMove.LEFT
      ]);
    }

    if (moveContext.hasAllyOnEight() === false) {
      possibleMoves.push([
        PrimitiveMove.LEFT,
        PrimitiveMove.LEFT,
        PrimitiveMove.DOWN
      ]);
    }

    if (moveContext.hasAllyOnTen() === false) {
      possibleMoves.push([
        PrimitiveMove.LEFT,
        PrimitiveMove.LEFT,
        PrimitiveMove.UP
      ]);
    }

    if (moveContext.hasAllyOnEleven() === false) {
      possibleMoves.push([
        PrimitiveMove.UP,
        PrimitiveMove.UP,
        PrimitiveMove.LEFT
      ]);
    }

    return possibleMoves;
  }
}
