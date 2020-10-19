import { REGULAR_CONFIG } from './ConfigProvider';
import ChessBoard from './ChessBoard';
import ChessConfigurationParser from './ChessConfigurationParser';
import ChessMoveParser from './ChessMoveParser';
import { inCheck, hasLegalMove } from './CheckAnalyser';
import { Orientation } from './Orientation';
import { PieceColour } from './PieceColour';

const initConfig = REGULAR_CONFIG;

export default class ChessGame {
  private _chessBoard: ChessBoard;

  constructor() {
    this._chessBoard = new ChessBoard(
      ChessConfigurationParser.parse(initConfig)
    );
  }

  get state(): string {
    return ChessConfigurationParser.serialize(
      this._chessBoard.currentConfiguration
    );
  }

  execute(move: string): void {
    this._chessBoard.move(ChessMoveParser.parse(move));
  }

  isCheckmated(): boolean {
    return (
      inCheck(
        this._chessBoard.currentConfiguration,
        this._chessBoard.orientation === Orientation.BLACK
          ? PieceColour.BLACK
          : PieceColour.WHITE,
        this._chessBoard.history
      ) &&
      !hasLegalMove(
        this._chessBoard.currentConfiguration,
        this._chessBoard.orientation,
        this._chessBoard.history
      )
    );
  }

  isStalemated(): boolean {
    return (
      !inCheck(
        this._chessBoard.currentConfiguration,
        this._chessBoard.orientation === Orientation.BLACK
          ? PieceColour.BLACK
          : PieceColour.WHITE,
        this._chessBoard.history
      ) &&
      !hasLegalMove(
        this._chessBoard.currentConfiguration,
        this._chessBoard.orientation,
        this._chessBoard.history
      )
    );
  }
}
