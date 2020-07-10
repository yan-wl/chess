import ChessConfiguration from "./ChessConfiguration";
import ChessMove from "./ChessMove";
import Pawn from "./Pawn";
import PawnMoveContext from "./PawnMoveContext";

export default class ChessBoard {
  private _configurations: ChessConfiguration[];

  constructor(initConfig: ChessConfiguration) {
    this._configurations = [initConfig];
  }

  get currentConfiguration(): ChessConfiguration {
    return this._configurations[this._configurations.length - 1];
  }

  toString(): string {
    return this.currentConfiguration.toString();
  }

  move(chessMove: ChessMove): void {
    const movingPiece = this.currentConfiguration.getPieceAt(chessMove.source);

    if (movingPiece instanceof Pawn) {
      const possibleMoves = movingPiece.getPossibleMoves(new PawnMoveContext(this.currentConfiguration, chessMove.source));
      
      /*
        This is potentially too inefficient.
      */
      const allowed = possibleMoves.some(move => {
        const resultingPosition = chessMove.source.apply(move);
        return chessMove.destination.sameAs(resultingPosition);
      });

      // TODO: Add legality checks

      if (allowed) {
        const newConfig = this.currentConfiguration.apply(chessMove);
        this._configurations.push(newConfig);
      } else {
        throw Error('Invalid move.');
      }
    } else {
      throw Error('Invalid move.');
    }
  }
}
