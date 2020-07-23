import PawnMoveContext from './PawnMoveContext';
import ChessConfiguration from './ChessConfiguration';
import ChessPosition from './ChessPosition';

export default class MoveContext implements PawnMoveContext {
  private _configuration: ChessConfiguration;
  private _piecePosition: ChessPosition;

  constructor(configuration: ChessConfiguration, piecePosition: ChessPosition) {
    this._configuration = configuration;
    this._piecePosition = piecePosition;
  }

  pawnHasNotMoved(): boolean {
    // TODO: Implement
    return true;
  }

  hasPieceInFrontOfPawn(): boolean {
    return this._configuration.isOccupied(this._piecePosition.front);
  }
}
