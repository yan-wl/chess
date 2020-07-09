import ChessPiece from "./ChessPiece";

export default class Queen extends ChessPiece {
  constructor() {
    super();
  }

  toString(): string {
    return 'Q';
  }
}