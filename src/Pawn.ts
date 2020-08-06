import ChessPiece from './ChessPiece';
import { Move } from './Move';
import PawnMoveContext from './PawnMoveContext';
import { RelativePosition } from './RelativePosition';
import { PieceColour } from './PieceColour';
import { MoveEffect } from './MoveEffect';
import { PieceType } from './PieceType';

export default class Pawn extends ChessPiece {
  constructor(colour: PieceColour) {
    super(colour);
  }

  get type(): PieceType {
    return PieceType.PAWN;
  }

  getNonAttackingMoves(moveContext: PawnMoveContext): Move[] {
    const nonAttackingMoves: Move[] = [];

    // NOTE: Using === false is intentional to account for undefined.
    if (moveContext.hasPieceInFront() === false) {
      nonAttackingMoves.push({
        steps: [RelativePosition.FRONT],
        effect: moveContext.isOnSeventhRank()
          ? MoveEffect.PROMOTION
          : MoveEffect.REGULAR
      });
    }

    if (
      moveContext.pawnHasNotMoved() &&
      moveContext.hasPieceInFront() === false &&
      moveContext.hasPieceTwoSquaresInFront() === false
    ) {
      nonAttackingMoves.push({
        steps: [RelativePosition.FRONT, RelativePosition.FRONT],
        effect: MoveEffect.REGULAR
      });
    }

    if (moveContext.leftEnPassantIsAllowed()) {
      nonAttackingMoves.push({
        steps: [RelativePosition.FRONT, RelativePosition.LEFT],
        effect: MoveEffect.EN_PASSANT
      });
    }

    if (moveContext.rightEnPassantIsAllowed()) {
      nonAttackingMoves.push({
        steps: [RelativePosition.FRONT, RelativePosition.RIGHT],
        effect: MoveEffect.EN_PASSANT
      });
    }

    return nonAttackingMoves;
  }

  getAttackingMoves(moveContext: PawnMoveContext): Move[] {
    const attackingMoves: Move[] = [];

    if (moveContext.hasEnemyFrontLeft()) {
      attackingMoves.push({
        steps: [RelativePosition.FRONT, RelativePosition.LEFT],
        effect: moveContext.isOnSeventhRank()
          ? MoveEffect.PROMOTION
          : MoveEffect.REGULAR
      });
    }

    if (moveContext.hasEnemyFrontRight()) {
      attackingMoves.push({
        steps: [RelativePosition.FRONT, RelativePosition.RIGHT],
        effect: moveContext.isOnSeventhRank()
          ? MoveEffect.PROMOTION
          : MoveEffect.REGULAR
      });
    }

    return attackingMoves;
  }
}
