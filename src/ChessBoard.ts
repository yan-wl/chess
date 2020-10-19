import ChessConfiguration from './ChessConfiguration';
import ChessMove from './ChessMove';
import MoveContext from './MoveContext';
import MoveHistory from './MoveHistory';
import { Orientation } from './Orientation';
import { PieceColour } from './PieceColour';
import { inCheck } from './CheckAnalyser';
import Status from './Status';

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

  get orientation(): Orientation {
    return this._orientation;
  }

  get history(): MoveHistory {
    return this._moveHistory;
  }

  get currentConfiguration(): ChessConfiguration {
    return this._configurations[this._configurations.length - 1];
  }

  move(chessMove: ChessMove): Status {
    const movingPiece = this.currentConfiguration.getPieceAt(chessMove.source);

    if (movingPiece === null) {
      return Status.NO_PIECE;
    }

    if (
      !(
        (movingPiece.colour === PieceColour.WHITE &&
          this._orientation === Orientation.WHITE) ||
        (movingPiece.colour === PieceColour.BLACK &&
          this._orientation === Orientation.BLACK)
      )
    ) {
      return Status.WRONG_COLOUR;
    }

    const moveContext = new MoveContext(
      this.currentConfiguration,
      movingPiece,
      this._moveHistory,
      this._orientation
    );

    const possibleMoves = movingPiece.getAllMoves(moveContext);

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

    if (allowedMove === undefined) {
      return Status.INVALID_MOVE;
    }

    const newConfig = this.currentConfiguration.movePiece(
      chessMove,
      allowedMove.effect,
      this._orientation
    );

    if (
      inCheck(
        newConfig,
        this._orientation === Orientation.BLACK
          ? PieceColour.BLACK
          : PieceColour.WHITE,
        this._moveHistory
      )
    ) {
      return Status.ILLEGAL_MOVE;
    }

    this._configurations.push(newConfig);

    this._moveHistory.archive({
      piece: movingPiece,
      move: chessMove
    });

    this.flip();

    return Status.SUCCESS;
  }
}
