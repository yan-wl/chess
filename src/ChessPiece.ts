import { Move } from './Move';
import MoveContext from './MoveContext';
import { PieceColour } from './PieceColour';
import { PieceType } from './PieceType';

export default abstract class ChessPiece {
  private _colour: PieceColour;

  constructor(colour: PieceColour) {
    this._colour = colour;
  }

  get colour(): PieceColour {
    return this._colour;
  }

  abstract get type(): PieceType;
  abstract getNonAttackingMoves(moveContext: MoveContext): Move[];
  abstract getAttackingMoves(moveContext: MoveContext): Move[];

  getAllMoves(moveContext: MoveContext): Move[] {
    return this.getAttackingMoves(moveContext).concat(
      this.getNonAttackingMoves(moveContext)
    );
  }
}
