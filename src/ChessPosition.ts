import { ChessPositionRow } from "./ChessPositionRow";
import { ChessPositionColumn } from "./ChessPositionColumn";

export default class ChessPosition {
  private _column: ChessPositionColumn;
  private _row: ChessPositionRow;

  constructor(column: ChessPositionColumn, row: ChessPositionRow) {
    this._column = column;
    this._row = row;
  }

  toString(): string {
    return `${this._column}${this._row}`;
  }
}