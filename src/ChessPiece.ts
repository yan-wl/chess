import { Move } from './Move';
import MoveContext from './MoveContext';
import { PieceColour } from './PieceColour';
import { PieceType } from './PieceType';
import ChessPosition from './ChessPosition';
import { ChessPositionColumn } from './ChessPositionColumn';
import { ChessPositionRow } from './ChessPositionRow';
import Cloneable from './Cloneable';

export default abstract class ChessPiece implements Cloneable<ChessPiece> {
  private _colour: PieceColour;
  private _position: ChessPosition;

  constructor(colour: PieceColour) {
    this._colour = colour;
    this._position = ChessPosition.at(
      ChessPositionColumn.OUTSIDE,
      ChessPositionRow.OUTSIDE
    );
  }

  abstract clone(): ChessPiece;

  get colour(): PieceColour {
    return this._colour;
  }

  get position(): ChessPosition {
    return this._position;
  }

  set position(position: ChessPosition) {
    this._position = position;
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
