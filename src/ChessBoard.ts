import ChessConfiguration from './ChessConfiguration';
import ChessMove from './ChessMove';
import MoveContext from './MoveContext';
import MoveHistory from './MoveHistory';
import { Orientation } from './Orientation';

export default class ChessBoard {
  private _configurations: ChessConfiguration[];
  private _moveHistory: MoveHistory;
  private _orientation: Orientation;

  constructor(initConfig: ChessConfiguration) {
    this._configurations = [initConfig];
    this._moveHistory = new MoveHistory();
    this._orientation = Orientation.WHITE;
  }

  private flip(): void {
    if (this._orientation === Orientation.WHITE) {
      this._orientation = Orientation.BLACK;
    } else {
      this._orientation = Orientation.WHITE;
    }
  }

  get currentConfiguration(): ChessConfiguration {
    return this._configurations[this._configurations.length - 1];
  }

  move(chessMove: ChessMove): void {
    const movingPiece = this.currentConfiguration.getPieceAt(chessMove.source);

    if (movingPiece === null) {
      throw Error('Invalid move.');
    }

    const moveContext = new MoveContext(
      this.currentConfiguration,
      chessMove.source,
      movingPiece,
      this._moveHistory,
      this._orientation
    );

    const possibleMoves = movingPiece.getPossibleMoves(moveContext);

    /*
      This is potentially too inefficient.
    */
    const allowedMove = possibleMoves.find((move) => {
      const resultingPosition = chessMove.source.apply(
        move.steps,
        this._orientation
      );

      return (
        resultingPosition.isWithinBoundary() &&
        chessMove.destination === resultingPosition
      );
    });

    // TODO: Add legality checks

    if (allowedMove !== undefined) {
      const newConfig = this.currentConfiguration.movePiece(
        chessMove,
        allowedMove.effect,
        this._orientation
      );
      this._configurations.push(newConfig);
      this._moveHistory.archive({
        piece: movingPiece,
        move: chessMove
      });
      this.flip();
    } else {
      throw Error('Invalid move.');
    }
  }
}
