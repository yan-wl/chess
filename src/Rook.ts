import ChessPiece from './ChessPiece';
import RookMoveContext from './RookMoveContext';
import { Move } from './Move';
import { PieceColour } from './PieceColour';
import { RelativePosition } from './RelativePosition';

export default class Rook extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  getPossibleMoves(moveContext: RookMoveContext): Move[] {
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

    return possibleMoves;
  }
}
