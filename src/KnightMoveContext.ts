export default interface KnightMoveContext {
  /**
   * To check if there is a piece of the same colour on the square
   * that is at the relative one o'clock position.
   *
   * @returns undefined if the relative position is out of bounds
   */
  hasAllyOnOne(): boolean | undefined;

  /**
   * To check if there is a piece of the same colour on the square
   * that is at the relative two o'clock position.
   *
   * @returns undefined if the relative position is out of bounds
   */
  hasAllyOnTwo(): boolean | undefined;

  /**
   * To check if there is a piece of the same colour on the square
   * that is at the relative four o'clock position.
   *
   * @returns undefined if the relative position is out of bounds
   */
  hasAllyOnFour(): boolean | undefined;

  /**
   * To check if there is a piece of the same colour on the square
   * that is at the relative five o'clock position.
   *
   * @returns undefined if the relative position is out of bounds
   */
  hasAllyOnFive(): boolean | undefined;

  /**
   * To check if there is a piece of the same colour on the square
   * that is at the relative seven o'clock position.
   *
   * @returns undefined if the relative position is out of bounds
   */
  hasAllyOnSeven(): boolean | undefined;

  /**
   * To check if there is a piece of the same colour on the square
   * that is at the relative eight o'clock position.
   *
   * @returns undefined if the relative position is out of bounds
   */
  hasAllyOnEight(): boolean | undefined;

  /**
   * To check if there is a piece of the same colour on the square
   * that is at the relative ten o'clock position.
   *
   * @returns undefined if the relative position is out of bounds
   */
  hasAllyOnTen(): boolean | undefined;

  /**
   * To check if there is a piece of the same colour on the square
   * that is at the relative eleven o'clock position.
   *
   * @returns undefined if the relative position is out of bounds
   */
  hasAllyOnEleven(): boolean | undefined;
}
