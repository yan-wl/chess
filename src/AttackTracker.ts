import ChessPosition from './ChessPosition';
import { PieceColour } from './PieceColour';
import ChessConfiguration from './ChessConfiguration';
import MoveContext from './MoveContext';
import { Orientation } from './Orientation';
import MoveHistory from './MoveHistory';

/**
 * Determines if the position in the configuration is being attacked by a piece of the given colour
 *
 * @param configuration the chess configuration of interest
 * @param position the chess position of interest
 * @param colour the attacking piece's colour
 * @param history the current move history
 * @returns true if the position is being attacked by a piece of the given colour
 */
export function isUnderAttack(
  configuration: ChessConfiguration,
  position: ChessPosition,
  colour: PieceColour,
  history: MoveHistory
): boolean {
  /*
    NOTE: This is highly inefficient.
  */

  // Calculate all attacked positions
  const attackedPositions: Set<ChessPosition> = new Set();

  configuration.pieces
    .filter((piece) => piece.colour === colour)
    .forEach((piece) => {
      const attackingMoves = piece.getAttackingMoves(
        new MoveContext(
          configuration,
          piece,
          history,
          colour === PieceColour.BLACK ? Orientation.BLACK : Orientation.WHITE
        )
      );

      attackingMoves.forEach((move) => {
        const attackedPosition = piece.position.apply(
          move.steps,
          colour === PieceColour.BLACK ? Orientation.BLACK : Orientation.WHITE
        );

        if (attackedPosition.isWithinBoundary()) {
          attackedPositions.add(attackedPosition);
        }
      });
    });

  return attackedPositions.has(position);
}
