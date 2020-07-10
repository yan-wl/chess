import MoveContext from "./MoveContext";
import ChessConfiguration from "./ChessConfiguration";
import ChessPosition from "./ChessPosition";

export default class PawnMoveContext implements MoveContext {
  private _configuration: ChessConfiguration;
  private _pawnPosition: ChessPosition;

  constructor(configuration: ChessConfiguration, pawnPosition: ChessPosition) {
    this._configuration = configuration;
    this._pawnPosition = pawnPosition;
  }
  
  hasPieceInFront(): boolean {
    return this._configuration.isOccupied(this._pawnPosition.front);
  }
}