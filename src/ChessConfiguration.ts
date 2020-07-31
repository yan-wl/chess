import ChessPosition from './ChessPosition';
import ChessPiece from './ChessPiece';
import { MoveEffect } from './MoveEffect';
import { RelativePosition } from './RelativePosition';
import { Orientation } from './Orientation';
import ChessMove from './ChessMove';

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
    chessMove: ChessMove,
    effect: MoveEffect,
    orientation: Orientation
  ): ChessConfiguration {
    if (
      !chessMove.source.isWithinBoundary() ||
      !chessMove.destination.isWithinBoundary()
    ) {
      throw Error('Invalid move request.');
    }

    const sourcePiece = this.getPieceAt(chessMove.source);

    const newMap = new Map(this._positionMap);

    switch (effect) {
      case MoveEffect.REGULAR:
        newMap.set(chessMove.destination, sourcePiece);
        newMap.set(chessMove.source, null);
        break;
      case MoveEffect.EN_PASSANT:
        newMap.set(chessMove.destination, sourcePiece);
        newMap.set(chessMove.source, null);
        newMap.set(
          chessMove.destination.apply([RelativePosition.BACK], orientation),
          null
        );
        break;
      case MoveEffect.PROMOTION:
        // NOTE: This does not check if the promotion piece is of same colour
        if (chessMove.promotionPiece === null) {
          throw Error('Missing promotion piece.');
        }
        newMap.set(chessMove.source, null);
        newMap.set(chessMove.destination, chessMove.promotionPiece);
        break;
      case MoveEffect.LEFT_CASTLE:
        newMap.set(chessMove.destination, sourcePiece);
        newMap.set(chessMove.source, null);

        let leftMostPosition: ChessPosition = chessMove.source;

        while (true) {
          const leftPosition = leftMostPosition.apply(
            [RelativePosition.LEFT],
            orientation
          );

          if (!leftPosition.isWithinBoundary()) {
            break;
          }

          leftMostPosition = leftPosition;
        }

        newMap.set(
          chessMove.source.apply([RelativePosition.LEFT], orientation),
          this.getPieceAt(leftMostPosition)
        );
        newMap.set(leftMostPosition, null);

        break;
      case MoveEffect.RIGHT_CASTLE:
        newMap.set(chessMove.destination, sourcePiece);
        newMap.set(chessMove.source, null);

        let rightMostPosition: ChessPosition = chessMove.source;

        while (true) {
          const rightPosition = rightMostPosition.apply(
            [RelativePosition.RIGHT],
            orientation
          );

          if (!rightPosition.isWithinBoundary()) {
            break;
          }

          rightMostPosition = rightPosition;
        }

        newMap.set(
          chessMove.source.apply([RelativePosition.RIGHT], orientation),
          this.getPieceAt(rightMostPosition)
        );
        newMap.set(rightMostPosition, null);

        break;
    }

    return new ChessConfiguration(newMap);
  }
}
