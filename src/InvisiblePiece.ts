import ChessPiece from "./ChessPiece";

export default class InvisiblePiece extends ChessPiece {
  constructor() {
    super();
  }

  toString(): string {
    return '0';
  }
}