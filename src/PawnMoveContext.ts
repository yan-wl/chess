export default interface PawnMoveContext {
  pawnHasNotMoved(): boolean;

  /**
   * To check if there is a piece on the square in front
   *
   * @returns undefined if the position is out of bounds
   */
  hasPieceInFront(): boolean | undefined;

  /**
   * To check if there is a piece on the square two steps in front
   *
   * @returns undefined if the position is out of bounds
   */
  hasPieceTwoSquaresInFront(): boolean | undefined;
  leftEnPassantIsAllowed(): boolean;
  rightEnPassantIsAllowed(): boolean;

  /**
   * To check if there is an enemy on the square in front and on the left
   *
   * @returns true only if front left position is valid and has an enemy
   */
  hasEnemyFrontLeft(): boolean;

  /**
   * To check if there is an enemy on the square in front and on the right
   *
   * @returns true only if front right position is valid and has an enemy
   */
  hasEnemyFrontRight(): boolean;

  /**
   * To check if the pawn is on the seventh rank
   */
  isOnSeventhRank(): boolean;
}
