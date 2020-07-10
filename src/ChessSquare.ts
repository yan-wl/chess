import ChessPosition from "./ChessPosition";
import ChessPiece from "./ChessPiece";

export default class ChessSquare {
  private _position: ChessPosition;
  private _piece: ChessPiece;

  constructor(position: ChessPosition, piece: ChessPiece) {
    this._position = position;
    this._piece = piece;
  }

  get position(): ChessPosition {
    return this._position;
  }

  get piece(): ChessPiece {
    return this._piece;
  }

  toString(): string {
    return `Position: ${this._position.toString()}, Piece: ${this._piece.toString()}`;
  }
}