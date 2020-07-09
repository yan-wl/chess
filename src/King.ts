import ChessPiece from "./ChessPiece";

export default class King extends ChessPiece {
  constructor() {
    super();
  }

  toString(): string {
    return 'K';
  }
}