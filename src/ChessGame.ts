import { REGULAR_CONFIG, CASTLE_TEST } from './ConfigProvider';
import ChessBoard from './ChessBoard';
import ChessConfigurationParser from './ChessConfigurationParser';
import ChessMoveParser from './ChessMoveParser';

export default class ChessGame {
  private _chessBoard: ChessBoard;

  constructor() {
    // const initConfig = REGULAR_CONFIG;
    const initConfig = CASTLE_TEST;
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
}
