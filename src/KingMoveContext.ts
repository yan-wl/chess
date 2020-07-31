export default interface KingMoveContext {
  /**
   * To check if there is a piece of the same colour on the square in front.
   *
   * @returns undefined if the relative position is out of bounds
   */
  hasAllyInFront(): boolean | undefined;

  /**
   * To check if there is a piece of the same colour on the square behind.
   *
   * @returns undefined if the relative position is out of bounds
   */
  hasAllyBehind(): boolean | undefined;

  /**
   * To check if there is a piece of the same colour on the square to the left.
   *
   * @returns undefined if the relative position is out of bounds
   */
  hasAllyOnLeft(): boolean | undefined;

  /**
   * To check if there is a piece of the same colour on the square to the right.
   *
   * @returns undefined if the relative position is out of bounds
   */
  hasAllyOnRight(): boolean | undefined;

  /**
   * To check if there is a piece of the same colour on the square in front and on the left.
   *
   * @returns undefined if the relative position is out of bounds
   */
  hasAllyFrontLeft(): boolean | undefined;

  /**
   * To check if there is a piece of the same colour on the square in front and on the right.
   *
   * @returns undefined if the relative position is out of bounds
   */
  hasAllyFrontRight(): boolean | undefined;

  /**
   * To check if there is a piece of the same colour on the square behind and on the left.
   *
   * @returns undefined if the relative position is out of bounds
   */
  hasAllyBackLeft(): boolean | undefined;

  /**
   * To check if there is a piece of the same colour on the square behind and on the right.
   *
   * @returns undefined if the relative position is out of bounds
   */
  hasAllyBackRight(): boolean | undefined;

  leftCastleIsAllowed(): boolean;
  rightCastleIsAllowed(): boolean;
}
