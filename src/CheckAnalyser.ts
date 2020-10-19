import ChessConfiguration from './ChessConfiguration';
import { PieceColour } from './PieceColour';
import { PieceType } from './PieceType';
import { isUnderAttack } from './AttackTracker';
import MoveHistory from './MoveHistory';
import { Orientation } from './Orientation';
import MoveContext from './MoveContext';
import ChessMove from './ChessMove';

/**
 * Determines if a king of the specified colour is in check in the configuration
 *
 * @param configuration the chess configuration of interest
 * @param colour the king's colour
 * @param history the current move history
 */
export function inCheck(
  configuration: ChessConfiguration,
  colour: PieceColour,
  history: MoveHistory
): boolean {
  return configuration.pieces
    .filter((piece) => piece.type === PieceType.KING && piece.colour === colour)
    .some((king) =>
      isUnderAttack(
        configuration,
        king.position,
        colour === PieceColour.BLACK ? PieceColour.WHITE : PieceColour.BLACK,
        history
      )
    );
}

/**
 * Determines if the player for the specific orientation has any legal moves
 *
 * @param configuration the current configuration
 * @param orientation the current orientation
 * @param history the current move history
 */
export function hasLegalMove(
  configuration: ChessConfiguration,
  orientation: Orientation,
  history: MoveHistory
): boolean {
  return configuration.pieces
    .filter(
      (piece) =>
        piece.colour ===
        (orientation === Orientation.BLACK
          ? PieceColour.BLACK
          : PieceColour.WHITE)
    )
    .some((piece) => {
      const moves = piece.getAllMoves(
        new MoveContext(configuration, piece, history, orientation)
      );

      return moves.some((move) => {
        const newConfig = configuration.movePiece(
          new ChessMove(
            piece.position,
            piece.position.apply(move.steps, orientation),
            piece.clone()
          ),
          move.effect,
          orientation
        );

        return !inCheck(
          newConfig,
          orientation === Orientation.BLACK
            ? PieceColour.BLACK
            : PieceColour.WHITE,
          history
        );
      });
    });
}
