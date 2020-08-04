import ChessPosition from './ChessPosition';
import { MoveEffect } from './MoveEffect';
import { RelativePosition } from './RelativePosition';
import { Orientation } from './Orientation';
import ChessMove from './ChessMove';
import NullPiece from './NullPiece';
import { PieceColour } from './PieceColour';
import PositionTracker from './PositionTracker';
import ChessPiece from './ChessPiece';

export default class ChessConfiguration {
  private _positionTracker: PositionTracker;

  constructor(positionTracker: PositionTracker) {
    this._positionTracker = positionTracker;
  }

  get positionTracker(): PositionTracker {
    return this._positionTracker;
  }

  getPieceAt(position: ChessPosition): ChessPiece {
    return this.positionTracker.get(position);
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

    const newPositionTracker = this.positionTracker.clone();

    switch (effect) {
      case MoveEffect.REGULAR:
        newPositionTracker.set(chessMove.destination, sourcePiece);
        newPositionTracker.set(
          chessMove.source,
          new NullPiece(
            sourcePiece.colour === PieceColour.BLACK
              ? PieceColour.WHITE
              : PieceColour.BLACK
          )
        );
        break;
      case MoveEffect.EN_PASSANT:
        newPositionTracker.set(chessMove.destination, sourcePiece);
        newPositionTracker.set(
          chessMove.source,
          new NullPiece(
            sourcePiece.colour === PieceColour.BLACK
              ? PieceColour.WHITE
              : PieceColour.BLACK
          )
        );
        newPositionTracker.set(
          chessMove.destination.apply([RelativePosition.BACK], orientation),
          new NullPiece(
            sourcePiece.colour === PieceColour.BLACK
              ? PieceColour.WHITE
              : PieceColour.BLACK
          )
        );
        break;
      case MoveEffect.PROMOTION:
        // NOTE: This does not check if the promotion piece is of same colour
        if (chessMove.promotionPiece === null) {
          throw Error('Missing promotion piece.');
        }
        newPositionTracker.set(
          chessMove.source,
          new NullPiece(
            sourcePiece.colour === PieceColour.BLACK
              ? PieceColour.WHITE
              : PieceColour.BLACK
          )
        );
        newPositionTracker.set(chessMove.destination, chessMove.promotionPiece);
        break;
      case MoveEffect.LEFT_CASTLE:
        newPositionTracker.set(chessMove.destination, sourcePiece);
        newPositionTracker.set(
          chessMove.source,
          new NullPiece(
            sourcePiece.colour === PieceColour.BLACK
              ? PieceColour.WHITE
              : PieceColour.BLACK
          )
        );

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

        newPositionTracker.set(
          chessMove.source.apply([RelativePosition.LEFT], orientation),
          this.getPieceAt(leftMostPosition)
        );
        newPositionTracker.set(
          leftMostPosition,
          new NullPiece(
            sourcePiece.colour === PieceColour.BLACK
              ? PieceColour.WHITE
              : PieceColour.BLACK
          )
        );

        break;
      case MoveEffect.RIGHT_CASTLE:
        newPositionTracker.set(chessMove.destination, sourcePiece);
        newPositionTracker.set(
          chessMove.source,
          new NullPiece(
            sourcePiece.colour === PieceColour.BLACK
              ? PieceColour.WHITE
              : PieceColour.BLACK
          )
        );

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

        newPositionTracker.set(
          chessMove.source.apply([RelativePosition.RIGHT], orientation),
          this.getPieceAt(rightMostPosition)
        );
        newPositionTracker.set(
          rightMostPosition,
          new NullPiece(
            sourcePiece.colour === PieceColour.BLACK
              ? PieceColour.WHITE
              : PieceColour.BLACK
          )
        );

        break;
    }

    return new ChessConfiguration(newPositionTracker);
  }
}
