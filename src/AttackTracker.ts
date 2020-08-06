import ChessPosition from './ChessPosition';
import { PieceColour } from './PieceColour';
import ChessConfiguration from './ChessConfiguration';
import MoveContext from './MoveContext';
import { Orientation } from './Orientation';

/**
 * Determines if the position in the configuration is being attacked by a piece, that is not a king, of different colour
 *
 * @param configuration the chess configuration of interest
 * @param position the chess position of interest
 * @param colour piece colour that the position should belong to
 * @returns true if the position is being attacked by a piece, that is not a king, of a different colour
 */
export function isUnderAttack(
  configuration: ChessConfiguration,
  moveContext: MoveContext,
  position: ChessPosition,
  colour: PieceColour,
  orientation: Orientation
): boolean {
  /*
    NOTE: This is highly inefficient and hacky.
  */

  // Calculate all attacked positions
  const attackedPositions: Set<ChessPosition> = new Set();

  for (const [position, piece] of configuration.positionMap.entries()) {
    // Only calculate for pieces with a different colour
    if (piece !== null && piece.colour !== colour) {
      const moves = piece.getAttackingMoves(moveContext);

      for (const move of moves) {
        const attackedPosition = position.apply(move.steps, orientation);
        attackedPositions.add(attackedPosition);
      }
    }
  }

  return attackedPositions.has(position);
}
