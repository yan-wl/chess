import ChessPiece from "./ChessPiece";

export default class Knight extends ChessPiece {
  constructor() {
    super();
  }

  toString(): string {
    return 'N';
  }
}