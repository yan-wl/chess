import ChessConfiguration from "./ChessConfiguration";
import ChessMove from "./ChessMove";

export default class ChessBoard {
  private _configuration: ChessConfiguration;

  constructor(initConfig: ChessConfiguration) {
    this._configuration = initConfig;
  }

  toString(): string {
    return this._configuration.toString();
  }

  move(chessMove: ChessMove): void {
    // TODO
  }
}
