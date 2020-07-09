import ChessPiece from "./ChessPiece";

export default class ChessConfiguration {
  private _structure: ChessPiece[][];

  constructor(structure: ChessPiece[][]) {
    this._structure = structure;
  }

  toString(): string {
    let result = '';
    result = result + '    [BLACK]    ';
    result = result + '\n';
    this._structure.forEach(row => {
      result = result + row.map(row => row.toString()).join('|');
      result = result + '\n';
    });
    result = result + '    [WHITE]    ';
    return result.trimRight();
  }
}