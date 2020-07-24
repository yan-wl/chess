import ChessPiece from './ChessPiece';
import KnightMoveContext from './KnightMoveContext';
import { Move } from './Move';
import { PieceColour } from './PieceColour';
import { RelativePosition } from './RelativePosition';

export default class Knight extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  getPossibleMoves(moveContext: KnightMoveContext): Move[] {
    const possibleMoves: Move[] = [];

    // NOTE: Using === false is intentional to account for undefined.

    if (moveContext.hasAllyOnOne() === false) {
      possibleMoves.push([
        RelativePosition.FRONT,
        RelativePosition.FRONT,
        RelativePosition.RIGHT
      ]);
    }

    if (moveContext.hasAllyOnTwo() === false) {
      possibleMoves.push([
        RelativePosition.RIGHT,
        RelativePosition.RIGHT,
        RelativePosition.FRONT
      ]);
    }

    if (moveContext.hasAllyOnFour() === false) {
      possibleMoves.push([
        RelativePosition.RIGHT,
        RelativePosition.RIGHT,
        RelativePosition.BACK
      ]);
    }

    if (moveContext.hasAllyOnFive() === false) {
      possibleMoves.push([
        RelativePosition.BACK,
        RelativePosition.BACK,
        RelativePosition.RIGHT
      ]);
    }

    if (moveContext.hasAllyOnSeven() === false) {
      possibleMoves.push([
        RelativePosition.BACK,
        RelativePosition.BACK,
        RelativePosition.LEFT
      ]);
    }

    if (moveContext.hasAllyOnEight() === false) {
      possibleMoves.push([
        RelativePosition.LEFT,
        RelativePosition.LEFT,
        RelativePosition.BACK
      ]);
    }

    if (moveContext.hasAllyOnTen() === false) {
      possibleMoves.push([
        RelativePosition.LEFT,
        RelativePosition.LEFT,
        RelativePosition.FRONT
      ]);
    }

    if (moveContext.hasAllyOnEleven() === false) {
      possibleMoves.push([
        RelativePosition.FRONT,
        RelativePosition.FRONT,
        RelativePosition.LEFT
      ]);
    }

    return possibleMoves;
  }
}
