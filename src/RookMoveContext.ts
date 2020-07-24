export default interface RookMoveContext {
  /**
   * To check if there is an open lane in front
   *
   * @param stepCount number of steps to check
   * @returns true if every position in front up to the final position is within bounds and has no piece,
   * and the final position is within bounds and does not have an ally
   */
  hasOpenFrontLane(stepCount: number): boolean;

  /**
   * To check if there is an open lane behind
   *
   * @param stepCount number of steps to check
   * @returns true if every position behind up to the final position is within bounds and has no piece,
   * and the final position is within bounds and does not have an ally
   */
  hasOpenBackLane(stepCount: number): boolean;

  /**
   * To check if there is an open lane to the left
   *
   * @param stepCount number of steps to check
   * @returns true if every position to the left up to the final position is within bounds and has no piece,
   * and the final position is within bounds and does not have an ally
   */
  hasOpenLeftLane(stepCount: number): boolean;

  /**
   * To check if there is an open lane to the right
   *
   * @param stepCount number of steps to check
   * @returns true if every position to the right up to the final position is within bounds and has no piece,
   * and the final position is within bounds and does not have an ally
   */
  hasOpenRightLane(stepCount: number): boolean;
}
