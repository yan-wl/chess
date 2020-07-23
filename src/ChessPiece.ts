import { BoardMove } from './BoardMove';
import MoveContext from './MoveContext';
import { PieceColour } from './PieceColour';

export default abstract class ChessPiece {
  private _colour: PieceColour;

  constructor(colour: PieceColour) {
    this._colour = colour;
  }

  get colour(): PieceColour {
    return this._colour;
  }

  abstract getPossibleMoves(moveContext: MoveContext): BoardMove[];
}
