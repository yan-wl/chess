import ChessPosition from './ChessPosition';
import ChessPiece from './ChessPiece';
import { MoveEffect } from './MoveEffect';
import { RelativePosition } from './RelativePosition';
import { Orientation } from './Orientation';

export default class ChessConfiguration {
  private _positionMap: Map<ChessPosition, ChessPiece | null>;

  constructor(positionMap: Map<ChessPosition, ChessPiece | null>) {
    this._positionMap = positionMap;
  }

  get positionMap(): Map<ChessPosition, ChessPiece | null> {
    return this._positionMap;
  }

  /**
   * To retrieve the chess piece placed at any position
   *
   * @param position a chess position
   * @returns the chess piece in the position or null if there is none
   * @throws error if the position is unknown
   */
  getPieceAt(position: ChessPosition): ChessPiece | null {
    const piece = this._positionMap.get(position);

    if (piece === undefined) {
      throw Error('Invalid chess position.');
    }

    return piece;
  }

  /**
   * Move piece at source to destination
   *
   * @param source position of piece that is being moved
   * @param destination position that piece is being moved to
   */
  movePiece(
    source: ChessPosition,
    destination: ChessPosition,
    effect: MoveEffect,
    orientation: Orientation
  ): ChessConfiguration {
    if (!source.isWithinBoundary() || !destination.isWithinBoundary()) {
      throw Error('Invalid move request.');
    }

    const sourcePiece = this.getPieceAt(source);

    const newMap = new Map(this._positionMap);

    switch (effect) {
      case MoveEffect.REGULAR:
        newMap.set(destination, sourcePiece);
        newMap.set(source, null);
        break;
      case MoveEffect.EN_PASSANT:
        newMap.set(destination, sourcePiece);
        newMap.set(source, null);
        newMap.set(
          destination.apply([RelativePosition.BACK], orientation),
          null
        );
        break;
      case MoveEffect.PROMOTION:
        break;
      case MoveEffect.CASTLE:
        break;
    }

    return new ChessConfiguration(newMap);
  }
}
