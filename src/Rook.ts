import ChessPiece from "./ChessPiece";

export default class Rook extends ChessPiece {
  constructor() {
    super();
  }

  toString(): string {
    return 'R';
  }
}