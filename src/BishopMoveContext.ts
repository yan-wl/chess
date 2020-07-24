export default interface BishopMoveContext {
  /**
   * To check if there is an open diagonal in the north east direction
   *
   * @param stepCount number of steps to check
   * @returns true if every position in front up to the final position is within bounds and has no piece,
   * and the final position is within bounds and does not have an ally
   */
  hasOpenNorthEastDiagonal(stepCount: number): boolean;

  /**
   * To check if there is an open diagonal in the south east direction
   *
   * @param stepCount number of steps to check
   * @returns true if every position in front up to the final position is within bounds and has no piece,
   * and the final position is within bounds and does not have an ally
   */
  hasOpenSouthEastDiagonal(stepCount: number): boolean;

  /**
   * To check if there is an open diagonal in the south west direction
   *
   * @param stepCount number of steps to check
   * @returns true if every position in front up to the final position is within bounds and has no piece,
   * and the final position is within bounds and does not have an ally
   */
  hasOpenSouthWestDiagonal(stepCount: number): boolean;

  /**
   * To check if there is an open diagonal in the north west direction
   *
   * @param stepCount number of steps to check
   * @returns true if every position in front up to the final position is within bounds and has no piece,
   * and the final position is within bounds and does not have an ally
   */
  hasOpenNorthWestDiagonal(stepCount: number): boolean;
}
