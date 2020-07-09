import ChessPiece from "./ChessPiece";

export default class Pawn extends ChessPiece {
  constructor() {
    super();
  }

  toString(): string {
    return 'P';
  }
}