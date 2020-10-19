import ChessConfiguration from './ChessConfiguration';
import ChessPosition from './ChessPosition';
import PawnMoveContext from './PawnMoveContext';
import KnightMoveContext from './KnightMoveContext';
import ChessPiece from './ChessPiece';
import RookMoveContext from './RookMoveContext';
import BishopMoveContext from './BishopMoveContext';
import QueenMoveContext from './QueenMoveContext';
import KingMoveContext from './KingMoveContext';
import MoveHistory from './MoveHistory';
import { RelativePosition } from './RelativePosition';
import { Orientation } from './Orientation';
import { PieceType } from './PieceType';
import { isUnderAttack } from './AttackTracker';
import { PieceColour } from './PieceColour';

export default class MoveContext
  implements
    PawnMoveContext,
    KnightMoveContext,
    RookMoveContext,
    BishopMoveContext,
    QueenMoveContext,
    KingMoveContext {
  private _configuration: ChessConfiguration;
  private _piece: ChessPiece;
  private _history: MoveHistory;
  private _orientation: Orientation;

  constructor(
    configuration: ChessConfiguration,
    piece: ChessPiece,
    history: MoveHistory,
    orientation: Orientation
  ) {
    this._configuration = configuration;
    this._piece = piece;
    this._history = history;
    this._orientation = orientation;
  }

  isOnSeventhRank(): boolean {
    return (
      this._piece.position
        .apply([RelativePosition.FRONT], this._orientation)
        .isWithinBoundary() &&
      !this._piece.position
        .apply(
          [RelativePosition.FRONT, RelativePosition.FRONT],
          this._orientation
        )
        .isWithinBoundary()
    );
  }

  pawnHasNotMoved(): boolean {
    const records = this._history.filter((record) =>
      record.piece.equals(this._piece)
    );

    return records.size === 0;
  }

  hasPieceInFront(): boolean | undefined {
    const frontPosition = this._piece.position.apply(
      [RelativePosition.FRONT],
      this._orientation
    );

    if (!frontPosition.isWithinBoundary()) {
      return undefined;
    }

    const frontPiece = this._configuration.getPieceAt(frontPosition);

    return frontPiece.type !== PieceType.NULL;
  }

  hasPieceTwoSquaresInFront(): boolean | undefined {
    const frontPosition = this._piece.position.apply(
      [RelativePosition.FRONT, RelativePosition.FRONT],
      this._orientation
    );

    if (!frontPosition.isWithinBoundary()) {
      return undefined;
    }

    const frontPiece = this._configuration.getPieceAt(frontPosition);

    return frontPiece.type !== PieceType.NULL;
  }

  leftEnPassantIsAllowed(): boolean {
    const frontLeftPosition = this._piece.position.apply(
      [RelativePosition.FRONT, RelativePosition.LEFT],
      this._orientation
    );

    if (!frontLeftPosition.isWithinBoundary()) {
      return false;
    }

    const frontLeftPiece = this._configuration.getPieceAt(frontLeftPosition);

    if (frontLeftPiece.type !== PieceType.NULL) {
      return false;
    }

    const { latestRecord } = this._history;

    if (latestRecord === undefined) {
      return false;
    }

    const latestMove = latestRecord.move;
    const latestPiece = latestRecord.piece;

    if (
      latestMove.source !==
        this._piece.position.apply(
          [
            RelativePosition.FRONT,
            RelativePosition.FRONT,
            RelativePosition.LEFT
          ],
          this._orientation
        ) ||
      latestMove.destination !==
        this._piece.position.apply(
          [RelativePosition.LEFT],
          this._orientation
        ) ||
      !(latestPiece.type === PieceType.PAWN)
    ) {
      return false;
    }

    return true;
  }

  rightEnPassantIsAllowed(): boolean {
    const frontRightPosition = this._piece.position.apply(
      [RelativePosition.FRONT, RelativePosition.RIGHT],
      this._orientation
    );

    if (!frontRightPosition.isWithinBoundary()) {
      return false;
    }

    const frontRightPiece = this._configuration.getPieceAt(frontRightPosition);

    if (frontRightPiece.type !== PieceType.NULL) {
      return false;
    }

    const { latestRecord } = this._history;

    if (latestRecord === undefined) {
      return false;
    }

    const latestMove = latestRecord.move;
    const latestPiece = latestRecord.piece;

    if (
      latestMove.source !==
        this._piece.position.apply(
          [
            RelativePosition.FRONT,
            RelativePosition.FRONT,
            RelativePosition.RIGHT
          ],
          this._orientation
        ) ||
      latestMove.destination !==
        this._piece.position.apply(
          [RelativePosition.RIGHT],
          this._orientation
        ) ||
      !(latestPiece.type === PieceType.PAWN)
    ) {
      return false;
    }

    return true;
  }

  hasEnemyFrontLeft(): boolean {
    const frontLeftPosition = this._piece.position.apply(
      [RelativePosition.FRONT, RelativePosition.LEFT],
      this._orientation
    );

    if (!frontLeftPosition.isWithinBoundary()) {
      return false;
    }

    const frontLeftPiece = this._configuration.getPieceAt(frontLeftPosition);

    if (
      frontLeftPiece.type === PieceType.NULL ||
      frontLeftPiece.colour === this._piece.colour
    ) {
      return false;
    }

    return true;
  }

  hasEnemyFrontRight(): boolean {
    const frontRightPosition = this._piece.position.apply(
      [RelativePosition.FRONT, RelativePosition.RIGHT],
      this._orientation
    );

    if (!frontRightPosition.isWithinBoundary()) {
      return false;
    }

    const frontRightPiece = this._configuration.getPieceAt(frontRightPosition);

    if (
      frontRightPiece.type === PieceType.NULL ||
      frontRightPiece.colour === this._piece.colour
    ) {
      return false;
    }

    return true;
  }

  hasAllyOnOne(): boolean | undefined {
    const destination = this._piece.position.apply(
      [RelativePosition.FRONT, RelativePosition.FRONT, RelativePosition.RIGHT],
      this._orientation
    );

    if (!destination.isWithinBoundary()) {
      return undefined;
    }

    const destinationPiece = this._configuration.getPieceAt(destination);

    if (destinationPiece.type === PieceType.NULL) {
      return false;
    }

    if (destinationPiece.colour !== this._piece.colour) {
      return false;
    }

    return true;
  }

  hasAllyOnTwo(): boolean | undefined {
    const destination = this._piece.position.apply(
      [RelativePosition.RIGHT, RelativePosition.RIGHT, RelativePosition.FRONT],
      this._orientation
    );

    if (!destination.isWithinBoundary()) {
      return undefined;
    }

    const destinationPiece = this._configuration.getPieceAt(destination);

    if (destinationPiece.type === PieceType.NULL) {
      return false;
    }

    if (destinationPiece.colour !== this._piece.colour) {
      return false;
    }

    return true;
  }

  hasAllyOnFour(): boolean | undefined {
    const destination = this._piece.position.apply(
      [RelativePosition.RIGHT, RelativePosition.RIGHT, RelativePosition.BACK],
      this._orientation
    );

    if (!destination.isWithinBoundary()) {
      return undefined;
    }

    const destinationPiece = this._configuration.getPieceAt(destination);

    if (destinationPiece.type === PieceType.NULL) {
      return false;
    }

    if (destinationPiece.colour !== this._piece.colour) {
      return false;
    }

    return true;
  }

  hasAllyOnFive(): boolean | undefined {
    const destination = this._piece.position.apply(
      [RelativePosition.BACK, RelativePosition.BACK, RelativePosition.RIGHT],
      this._orientation
    );

    if (!destination.isWithinBoundary()) {
      return undefined;
    }

    const destinationPiece = this._configuration.getPieceAt(destination);

    if (destinationPiece.type === PieceType.NULL) {
      return false;
    }

    if (destinationPiece.colour !== this._piece.colour) {
      return false;
    }

    return true;
  }

  hasAllyOnSeven(): boolean | undefined {
    const destination = this._piece.position.apply(
      [RelativePosition.BACK, RelativePosition.BACK, RelativePosition.LEFT],
      this._orientation
    );

    if (!destination.isWithinBoundary()) {
      return undefined;
    }

    const destinationPiece = this._configuration.getPieceAt(destination);

    if (destinationPiece.type === PieceType.NULL) {
      return false;
    }

    if (destinationPiece.colour !== this._piece.colour) {
      return false;
    }

    return true;
  }

  hasAllyOnEight(): boolean | undefined {
    const destination = this._piece.position.apply(
      [RelativePosition.LEFT, RelativePosition.LEFT, RelativePosition.BACK],
      this._orientation
    );

    if (!destination.isWithinBoundary()) {
      return undefined;
    }

    const destinationPiece = this._configuration.getPieceAt(destination);

    if (destinationPiece.type === PieceType.NULL) {
      return false;
    }

    if (destinationPiece.colour !== this._piece.colour) {
      return false;
    }

    return true;
  }

  hasAllyOnTen(): boolean | undefined {
    const destination = this._piece.position.apply(
      [RelativePosition.LEFT, RelativePosition.LEFT, RelativePosition.FRONT],
      this._orientation
    );

    if (!destination.isWithinBoundary()) {
      return undefined;
    }

    const destinationPiece = this._configuration.getPieceAt(destination);

    if (destinationPiece.type === PieceType.NULL) {
      return false;
    }

    if (destinationPiece.colour !== this._piece.colour) {
      return false;
    }

    return true;
  }

  hasAllyOnEleven(): boolean | undefined {
    const destination = this._piece.position.apply(
      [RelativePosition.FRONT, RelativePosition.FRONT, RelativePosition.LEFT],
      this._orientation
    );

    if (!destination.isWithinBoundary()) {
      return undefined;
    }

    const destinationPiece = this._configuration.getPieceAt(destination);

    if (destinationPiece.type === PieceType.NULL) {
      return false;
    }

    if (destinationPiece.colour !== this._piece.colour) {
      return false;
    }

    return true;
  }

  hasOpenFrontLane(stepCount: number): boolean {
    if (stepCount < 1) {
      throw Error('Invalid step count.');
    }

    let currentPosition = this._piece.position;

    while (stepCount > 1) {
      const frontPosition = currentPosition.apply(
        [RelativePosition.FRONT],
        this._orientation
      );

      if (!frontPosition.isWithinBoundary()) {
        return false;
      }

      const frontPiece = this._configuration.getPieceAt(frontPosition);

      if (frontPiece.type !== PieceType.NULL) {
        return false;
      }

      currentPosition = frontPosition;
      stepCount--;
    }

    // Check final step separately
    const frontPosition = currentPosition.apply(
      [RelativePosition.FRONT],
      this._orientation
    );

    if (!frontPosition.isWithinBoundary()) {
      return false;
    }

    const frontPiece = this._configuration.getPieceAt(frontPosition);

    if (
      frontPiece.type !== PieceType.NULL &&
      frontPiece.colour === this._piece.colour
    ) {
      return false;
    }

    return true;
  }

  hasOpenBackLane(stepCount: number): boolean {
    if (stepCount < 1) {
      throw Error('Invalid step count.');
    }

    let currentPosition = this._piece.position;

    while (stepCount > 1) {
      const backPosition = currentPosition.apply(
        [RelativePosition.BACK],
        this._orientation
      );

      if (!backPosition.isWithinBoundary()) {
        return false;
      }

      const backPiece = this._configuration.getPieceAt(backPosition);

      if (backPiece.type !== PieceType.NULL) {
        return false;
      }

      currentPosition = backPosition;
      stepCount--;
    }

    // Check final step separately
    const backPosition = currentPosition.apply(
      [RelativePosition.BACK],
      this._orientation
    );

    if (!backPosition.isWithinBoundary()) {
      return false;
    }

    const backPiece = this._configuration.getPieceAt(backPosition);

    if (
      backPiece.type !== PieceType.NULL &&
      backPiece.colour === this._piece.colour
    ) {
      return false;
    }

    return true;
  }

  hasOpenLeftLane(stepCount: number): boolean {
    if (stepCount < 1) {
      throw Error('Invalid step count.');
    }

    let currentPosition = this._piece.position;

    while (stepCount > 1) {
      const leftPosition = currentPosition.apply(
        [RelativePosition.LEFT],
        this._orientation
      );

      if (!leftPosition.isWithinBoundary()) {
        return false;
      }

      const leftPiece = this._configuration.getPieceAt(leftPosition);

      if (leftPiece.type !== PieceType.NULL) {
        return false;
      }

      currentPosition = leftPosition;
      stepCount--;
    }

    // Check final step separately
    const leftPosition = currentPosition.apply(
      [RelativePosition.LEFT],
      this._orientation
    );

    if (!leftPosition.isWithinBoundary()) {
      return false;
    }

    const leftPiece = this._configuration.getPieceAt(leftPosition);

    if (
      leftPiece.type !== PieceType.NULL &&
      leftPiece.colour === this._piece.colour
    ) {
      return false;
    }

    return true;
  }

  hasOpenRightLane(stepCount: number): boolean {
    if (stepCount < 1) {
      throw Error('Invalid step count.');
    }

    let currentPosition = this._piece.position;

    while (stepCount > 1) {
      const rightPosition = currentPosition.apply(
        [RelativePosition.RIGHT],
        this._orientation
      );

      if (!rightPosition.isWithinBoundary()) {
        return false;
      }

      const rightPiece = this._configuration.getPieceAt(rightPosition);

      if (rightPiece.type !== PieceType.NULL) {
        return false;
      }

      currentPosition = rightPosition;
      stepCount--;
    }

    // Check final step separately
    const rightPosition = currentPosition.apply(
      [RelativePosition.RIGHT],
      this._orientation
    );

    if (!rightPosition.isWithinBoundary()) {
      return false;
    }

    const rightPiece = this._configuration.getPieceAt(rightPosition);

    if (
      rightPiece.type !== PieceType.NULL &&
      rightPiece.colour === this._piece.colour
    ) {
      return false;
    }

    return true;
  }

  hasOpenNorthEastDiagonal(stepCount: number): boolean {
    if (stepCount < 1) {
      throw Error('Invalid step count.');
    }

    let currentPosition = this._piece.position;

    while (stepCount > 1) {
      const diagonalPosition = currentPosition.apply(
        [RelativePosition.FRONT, RelativePosition.RIGHT],
        this._orientation
      );

      if (!diagonalPosition.isWithinBoundary()) {
        return false;
      }

      const diagonalPiece = this._configuration.getPieceAt(diagonalPosition);

      if (diagonalPiece.type !== PieceType.NULL) {
        return false;
      }

      currentPosition = diagonalPosition;
      stepCount--;
    }

    // Check final step separately
    const diagonalPosition = currentPosition.apply(
      [RelativePosition.FRONT, RelativePosition.RIGHT],
      this._orientation
    );

    if (!diagonalPosition.isWithinBoundary()) {
      return false;
    }

    const diagonalPiece = this._configuration.getPieceAt(diagonalPosition);

    if (
      diagonalPiece.type !== PieceType.NULL &&
      diagonalPiece.colour === this._piece.colour
    ) {
      return false;
    }

    return true;
  }

  hasOpenSouthEastDiagonal(stepCount: number): boolean {
    if (stepCount < 1) {
      throw Error('Invalid step count.');
    }

    let currentPosition = this._piece.position;

    while (stepCount > 1) {
      const diagonalPosition = currentPosition.apply(
        [RelativePosition.BACK, RelativePosition.RIGHT],
        this._orientation
      );

      if (!diagonalPosition.isWithinBoundary()) {
        return false;
      }

      const diagonalPiece = this._configuration.getPieceAt(diagonalPosition);

      if (diagonalPiece.type !== PieceType.NULL) {
        return false;
      }

      currentPosition = diagonalPosition;
      stepCount--;
    }

    // Check final step separately
    const diagonalPosition = currentPosition.apply(
      [RelativePosition.BACK, RelativePosition.RIGHT],
      this._orientation
    );

    if (!diagonalPosition.isWithinBoundary()) {
      return false;
    }

    const diagonalPiece = this._configuration.getPieceAt(diagonalPosition);

    if (
      diagonalPiece.type !== PieceType.NULL &&
      diagonalPiece.colour === this._piece.colour
    ) {
      return false;
    }

    return true;
  }

  hasOpenSouthWestDiagonal(stepCount: number): boolean {
    if (stepCount < 1) {
      throw Error('Invalid step count.');
    }

    let currentPosition = this._piece.position;

    while (stepCount > 1) {
      const diagonalPosition = currentPosition.apply(
        [RelativePosition.BACK, RelativePosition.LEFT],
        this._orientation
      );

      if (!diagonalPosition.isWithinBoundary()) {
        return false;
      }

      const diagonalPiece = this._configuration.getPieceAt(diagonalPosition);

      if (diagonalPiece.type !== PieceType.NULL) {
        return false;
      }

      currentPosition = diagonalPosition;
      stepCount--;
    }

    // Check final step separately
    const diagonalPosition = currentPosition.apply(
      [RelativePosition.BACK, RelativePosition.LEFT],
      this._orientation
    );

    if (!diagonalPosition.isWithinBoundary()) {
      return false;
    }

    const diagonalPiece = this._configuration.getPieceAt(diagonalPosition);

    if (
      diagonalPiece.type !== PieceType.NULL &&
      diagonalPiece.colour === this._piece.colour
    ) {
      return false;
    }

    return true;
  }

  hasOpenNorthWestDiagonal(stepCount: number): boolean {
    if (stepCount < 1) {
      throw Error('Invalid step count.');
    }

    let currentPosition = this._piece.position;

    while (stepCount > 1) {
      const diagonalPosition = currentPosition.apply(
        [RelativePosition.FRONT, RelativePosition.LEFT],
        this._orientation
      );

      if (!diagonalPosition.isWithinBoundary()) {
        return false;
      }

      const diagonalPiece = this._configuration.getPieceAt(diagonalPosition);

      if (diagonalPiece.type !== PieceType.NULL) {
        return false;
      }

      currentPosition = diagonalPosition;
      stepCount--;
    }

    // Check final step separately
    const diagonalPosition = currentPosition.apply(
      [RelativePosition.FRONT, RelativePosition.LEFT],
      this._orientation
    );

    if (!diagonalPosition.isWithinBoundary()) {
      return false;
    }

    const diagonalPiece = this._configuration.getPieceAt(diagonalPosition);

    if (
      diagonalPiece.type !== PieceType.NULL &&
      diagonalPiece.colour === this._piece.colour
    ) {
      return false;
    }

    return true;
  }

  hasAllyInFront(): boolean | undefined {
    const frontPosition = this._piece.position.apply(
      [RelativePosition.FRONT],
      this._orientation
    );

    if (!frontPosition.isWithinBoundary()) {
      return undefined;
    }

    const frontPiece = this._configuration.getPieceAt(frontPosition);

    if (
      frontPiece.type !== PieceType.NULL &&
      frontPiece.colour === this._piece.colour
    ) {
      return true;
    }

    return false;
  }

  hasAllyBehind(): boolean | undefined {
    const backPosition = this._piece.position.apply(
      [RelativePosition.BACK],
      this._orientation
    );

    if (!backPosition.isWithinBoundary()) {
      return undefined;
    }

    const backPiece = this._configuration.getPieceAt(backPosition);

    if (
      backPiece.type !== PieceType.NULL &&
      backPiece.colour === this._piece.colour
    ) {
      return true;
    }

    return false;
  }

  hasAllyOnLeft(): boolean | undefined {
    const leftPosition = this._piece.position.apply(
      [RelativePosition.LEFT],
      this._orientation
    );

    if (!leftPosition.isWithinBoundary()) {
      return undefined;
    }

    const leftPiece = this._configuration.getPieceAt(leftPosition);

    if (
      leftPiece.type !== PieceType.NULL &&
      leftPiece.colour === this._piece.colour
    ) {
      return true;
    }

    return false;
  }

  hasAllyOnRight(): boolean | undefined {
    const rightPosition = this._piece.position.apply(
      [RelativePosition.RIGHT],
      this._orientation
    );

    if (!rightPosition.isWithinBoundary()) {
      return undefined;
    }

    const rightPiece = this._configuration.getPieceAt(rightPosition);

    if (
      rightPiece.type !== PieceType.NULL &&
      rightPiece.colour === this._piece.colour
    ) {
      return true;
    }

    return false;
  }

  hasAllyFrontLeft(): boolean | undefined {
    const frontLeftPosition = this._piece.position.apply(
      [RelativePosition.FRONT, RelativePosition.LEFT],
      this._orientation
    );

    if (!frontLeftPosition.isWithinBoundary()) {
      return undefined;
    }

    const frontLeftPiece = this._configuration.getPieceAt(frontLeftPosition);

    if (
      frontLeftPiece.type !== PieceType.NULL &&
      frontLeftPiece.colour === this._piece.colour
    ) {
      return true;
    }

    return false;
  }

  hasAllyFrontRight(): boolean | undefined {
    const frontRightPosition = this._piece.position.apply(
      [RelativePosition.FRONT, RelativePosition.RIGHT],
      this._orientation
    );

    if (!frontRightPosition.isWithinBoundary()) {
      return undefined;
    }

    const frontRightPiece = this._configuration.getPieceAt(frontRightPosition);

    if (
      frontRightPiece.type !== PieceType.NULL &&
      frontRightPiece.colour === this._piece.colour
    ) {
      return true;
    }

    return false;
  }

  hasAllyBackLeft(): boolean | undefined {
    const backLeftPosition = this._piece.position.apply(
      [RelativePosition.BACK, RelativePosition.LEFT],
      this._orientation
    );

    if (!backLeftPosition.isWithinBoundary()) {
      return undefined;
    }

    const backLeftPiece = this._configuration.getPieceAt(backLeftPosition);

    if (
      backLeftPiece.type !== PieceType.NULL &&
      backLeftPiece.colour === this._piece.colour
    ) {
      return true;
    }

    return false;
  }

  hasAllyBackRight(): boolean | undefined {
    const backRightPosition = this._piece.position.apply(
      [RelativePosition.BACK, RelativePosition.RIGHT],
      this._orientation
    );

    if (!backRightPosition.isWithinBoundary()) {
      return undefined;
    }

    const backRightPiece = this._configuration.getPieceAt(backRightPosition);

    if (
      backRightPiece.type !== PieceType.NULL &&
      backRightPiece.colour === this._piece.colour
    ) {
      return true;
    }

    return false;
  }

  leftCastleIsAllowed(): boolean {
    // Store all valid positions on the left
    const leftPositions: ChessPosition[] = [];

    let leftPosition = this._piece.position.apply(
      [RelativePosition.LEFT],
      this._orientation
    );

    while (leftPosition.isWithinBoundary()) {
      leftPositions.push(leftPosition);

      leftPosition = leftPosition.apply(
        [RelativePosition.LEFT],
        this._orientation
      );
    }

    // To castle, there must at least be 2 spaces to the left
    if (leftPositions.length < 2) {
      return false;
    }

    // Positions in between combo pieces should not hold a piece
    for (let i = 0; i < leftPositions.length - 1; i++) {
      const position = leftPositions[i];

      if (this._configuration.getPieceAt(position).type !== PieceType.NULL) {
        return false;
      }
    }

    // Check if the positions travelled through are being attacked
    const travellingPositions: ChessPosition[] = [this._piece.position].concat(
      leftPositions.slice(0, 2)
    );

    if (
      travellingPositions.some((position) =>
        isUnderAttack(
          this._configuration,
          position,
          this._piece.colour === PieceColour.BLACK
            ? PieceColour.WHITE
            : PieceColour.BLACK,
          this._history
        )
      )
    ) {
      return false;
    }

    // Check if combo piece is a rook
    const comboPiece = this._configuration.getPieceAt(
      leftPositions[leftPositions.length - 1]
    );

    if (comboPiece.type === PieceType.NULL) {
      return false;
    }

    if (comboPiece.type !== PieceType.ROOK) {
      return false;
    }

    // Check if combo pieces have moved
    const records = this._history.filter(
      (record) =>
        record.piece.equals(this._piece) || record.piece.equals(comboPiece)
    );

    if (records.size !== 0) {
      return false;
    }

    return true;
  }

  rightCastleIsAllowed(): boolean {
    // Store all valid positions on the right
    const rightPositions: ChessPosition[] = [];

    let rightPosition = this._piece.position.apply(
      [RelativePosition.RIGHT],
      this._orientation
    );

    while (rightPosition.isWithinBoundary()) {
      rightPositions.push(rightPosition);

      rightPosition = rightPosition.apply(
        [RelativePosition.RIGHT],
        this._orientation
      );
    }

    // To castle, there must at least be 2 spaces to the right
    if (rightPositions.length < 2) {
      return false;
    }

    // Positions in between combo pieces should not hold a piece
    for (let i = 0; i < rightPositions.length - 1; i++) {
      const position = rightPositions[i];

      if (this._configuration.getPieceAt(position).type !== PieceType.NULL) {
        return false;
      }
    }

    // Check if the positions travelled through are being attacked
    const travellingPositions: ChessPosition[] = [this._piece.position].concat(
      rightPositions.slice(0, 2)
    );

    if (
      travellingPositions.some((position) =>
        isUnderAttack(
          this._configuration,
          position,
          this._piece.colour === PieceColour.BLACK
            ? PieceColour.WHITE
            : PieceColour.BLACK,
          this._history
        )
      )
    ) {
      return false;
    }

    // Check if combo piece is a rook
    const comboPiece = this._configuration.getPieceAt(
      rightPositions[rightPositions.length - 1]
    );

    if (comboPiece.type === PieceType.NULL) {
      return false;
    }

    if (comboPiece.type !== PieceType.ROOK) {
      return false;
    }

    // Check if combo pieces have moved
    const records = this._history.filter(
      (record) =>
        record.piece.equals(this._piece) || record.piece.equals(comboPiece)
    );

    if (records.size !== 0) {
      return false;
    }

    return true;
  }
}
