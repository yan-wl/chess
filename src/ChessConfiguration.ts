import ChessSquare from "./ChessSquare";

export default class ChessConfiguration {
  /*
    NOT TO BE CONFUSED WITH LIGHT AND DARK SQUARES!
    Black squares hold black pieces. White squares hold white pieces.
  */
  private _blackSquares: ChessSquare[];
  private _whiteSquares: ChessSquare[];

  constructor(blackSquares: ChessSquare[], whiteSquares: ChessSquare[]) {
    this._blackSquares = blackSquares;
    this._whiteSquares = whiteSquares;
  }

  toString(): string {
    let result = '';
    result += 'Black Squares:\n';
    this._blackSquares.forEach(square => {
      result += square.toString();
      result += '\n';
    });
    result += 'White Squares:\n';
    this._whiteSquares.forEach(square => {
      result += square.toString();
      result += '\n';
    });
    return result;
  }
}