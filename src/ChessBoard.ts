import ChessConfiguration from './ChessConfiguration';
import ChessMove from './ChessMove';
import MoveContext from './MoveContext';
import MoveHistory from './MoveHistory';

export default class ChessBoard {
  private _configurations: ChessConfiguration[];
  private _moveHistory: MoveHistory;

  constructor(initConfig: ChessConfiguration) {
    this._configurations = [initConfig];
    this._moveHistory = new MoveHistory();
  }

  get currentConfiguration(): ChessConfiguration {
    return this._configurations[this._configurations.length - 1];
  }

  move(chessMove: ChessMove): void {
    const movingPiece = this.currentConfiguration.getPieceAt(chessMove.source);

    if (movingPiece === null) {
      return;
    }

    const moveContext = new MoveContext(
      this.currentConfiguration,
      chessMove.source,
      movingPiece,
      this._moveHistory
    );

    const possibleMoves = movingPiece.getPossibleMoves(moveContext);

    /*
      This is potentially too inefficient.
    */
    const allowed = possibleMoves.some((move) => {
      const resultingPosition = chessMove.source.apply(move);

      return (
        resultingPosition.isWithinBoundary() &&
        chessMove.destination === resultingPosition
      );
    });

    // TODO: Add legality checks

    if (allowed) {
      const newConfig = this.currentConfiguration.move(
        chessMove.source,
        chessMove.destination
      );
      this._configurations.push(newConfig);
      this._moveHistory.archive({
        piece: movingPiece,
        move: chessMove
      });
    } else {
      throw Error('Invalid move.');
    }
  }
}
