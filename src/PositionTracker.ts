import ChessPosition from './ChessPosition';
import ChessPiece from './ChessPiece';
import Cloneable from './Cloneable';

export default class PositionTracker implements Cloneable<PositionTracker> {
  private _map: Map<ChessPosition, ChessPiece>;

  constructor() {
    this._map = new Map();
  }

  set(position: ChessPosition, piece: ChessPiece): void {
    this._map.set(position, piece);
    piece.position = position;
  }

  /**
   * To retrieve the chess piece placed at any position
   *
   * @param position a chess position
   * @returns the chess piece in the position
   * @throws error if the position is unknown
   */
  get(position: ChessPosition): ChessPiece {
    const piece = this._map.get(position);

    if (piece === undefined) {
      throw Error('Unknown position.');
    }

    return piece;
  }

  entries(): Iterable<[ChessPosition, ChessPiece]> {
    return this._map.entries();
  }

  clone(): PositionTracker {
    const clone = new PositionTracker();

    for (const [position, piece] of this.entries()) {
      clone.set(position, piece.clone());
    }

    return clone;
  }

  get pieces(): Set<ChessPiece> {
    return new Set(this._map.values());
  }
}
