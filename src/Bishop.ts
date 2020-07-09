import ChessPiece from "./ChessPiece";

export default class Bishop extends ChessPiece {
  constructor() {
    super();
  }

  toString(): string {
    return 'B';
  }
}