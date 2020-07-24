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
import Pawn from './Pawn';

export default class MoveContext
  implements
    PawnMoveContext,
    KnightMoveContext,
    RookMoveContext,
    BishopMoveContext,
    QueenMoveContext,
    KingMoveContext {
  private _configuration: ChessConfiguration;
  private _piecePosition: ChessPosition;
  private _piece: ChessPiece;
  private _history: MoveHistory;

  constructor(
    configuration: ChessConfiguration,
    piecePosition: ChessPosition,
    piece: ChessPiece,
    history: MoveHistory
  ) {
    this._configuration = configuration;
    this._piecePosition = piecePosition;
    this._piece = piece;
    this._history = history;
  }

  pawnHasNotMoved(): boolean {
    const records = this._history.filter(
      (record) => record.piece === this._piece
    );

    return records.size === 0;
  }

  hasPieceInFront(): boolean | undefined {
    const frontPosition = this._piecePosition.front;

    if (!frontPosition.isWithinBoundary()) {
      return undefined;
    }

    const frontPiece = this._configuration.getPieceAt(frontPosition);

    return frontPiece !== null;
  }

  hasPieceTwoSquaresInFront(): boolean | undefined {
    const frontPosition = this._piecePosition.front.front;

    if (!frontPosition.isWithinBoundary()) {
      return undefined;
    }

    const frontPiece = this._configuration.getPieceAt(frontPosition);

    return frontPiece !== null;
  }

  leftEnPassantIsAllowed(): boolean {
    const frontLeftPosition = this._piecePosition.front.left;

    if (!frontLeftPosition.isWithinBoundary()) {
      return false;
    }

    const frontLeftPiece = this._configuration.getPieceAt(frontLeftPosition);

    if (frontLeftPiece !== null) {
      return false;
    }

    const { latestRecord } = this._history;

    if (latestRecord === undefined) {
      return false;
    }

    const latestMove = latestRecord.move;
    const latestPiece = latestRecord.piece;

    if (
      latestMove.source !== this._piecePosition.front.front.left ||
      latestMove.destination !== this._piecePosition.left ||
      !(latestPiece instanceof Pawn)
    ) {
      return false;
    }

    return true;
  }

  rightEnPassantIsAllowed(): boolean {
    const frontRightPosition = this._piecePosition.front.right;

    if (!frontRightPosition.isWithinBoundary()) {
      return false;
    }

    const frontRightPiece = this._configuration.getPieceAt(frontRightPosition);

    if (frontRightPiece !== null) {
      return false;
    }

    const { latestRecord } = this._history;

    if (latestRecord === undefined) {
      return false;
    }

    const latestMove = latestRecord.move;
    const latestPiece = latestRecord.piece;

    if (
      latestMove.source !== this._piecePosition.front.front.right ||
      latestMove.destination !== this._piecePosition.right ||
      !(latestPiece instanceof Pawn)
    ) {
      return false;
    }

    return true;
  }

  hasEnemyFrontLeft(): boolean {
    const frontLeftPosition = this._piecePosition.front.left;

    if (!frontLeftPosition.isWithinBoundary()) {
      return false;
    }

    const frontLeftPiece = this._configuration.getPieceAt(frontLeftPosition);

    if (
      frontLeftPiece === null ||
      frontLeftPiece.colour === this._piece.colour
    ) {
      return false;
    }

    return true;
  }

  hasEnemyFrontRight(): boolean {
    const frontRightPosition = this._piecePosition.front.right;

    if (!frontRightPosition.isWithinBoundary()) {
      return false;
    }

    const frontRightPiece = this._configuration.getPieceAt(frontRightPosition);

    if (
      frontRightPiece === null ||
      frontRightPiece.colour === this._piece.colour
    ) {
      return false;
    }

    return true;
  }

  hasAllyOnOne(): boolean | undefined {
    const destination = this._piecePosition.front.front.right;

    if (!destination.isWithinBoundary()) {
      return undefined;
    }

    const destinationPiece = this._configuration.getPieceAt(destination);

    if (destinationPiece === null) {
      return false;
    }

    if (destinationPiece.colour !== this._piece.colour) {
      return false;
    }

    return true;
  }

  hasAllyOnTwo(): boolean | undefined {
    const destination = this._piecePosition.right.right.front;

    if (!destination.isWithinBoundary()) {
      return undefined;
    }

    const destinationPiece = this._configuration.getPieceAt(destination);

    if (destinationPiece === null) {
      return false;
    }

    if (destinationPiece.colour !== this._piece.colour) {
      return false;
    }

    return true;
  }

  hasAllyOnFour(): boolean | undefined {
    const destination = this._piecePosition.right.right.back;

    if (!destination.isWithinBoundary()) {
      return undefined;
    }

    const destinationPiece = this._configuration.getPieceAt(destination);

    if (destinationPiece === null) {
      return false;
    }

    if (destinationPiece.colour !== this._piece.colour) {
      return false;
    }

    return true;
  }

  hasAllyOnFive(): boolean | undefined {
    const destination = this._piecePosition.back.back.right;

    if (!destination.isWithinBoundary()) {
      return undefined;
    }

    const destinationPiece = this._configuration.getPieceAt(destination);

    if (destinationPiece === null) {
      return false;
    }

    if (destinationPiece.colour !== this._piece.colour) {
      return false;
    }

    return true;
  }

  hasAllyOnSeven(): boolean | undefined {
    const destination = this._piecePosition.back.back.left;

    if (!destination.isWithinBoundary()) {
      return undefined;
    }

    const destinationPiece = this._configuration.getPieceAt(destination);

    if (destinationPiece === null) {
      return false;
    }

    if (destinationPiece.colour !== this._piece.colour) {
      return false;
    }

    return true;
  }

  hasAllyOnEight(): boolean | undefined {
    const destination = this._piecePosition.left.left.back;

    if (!destination.isWithinBoundary()) {
      return undefined;
    }

    const destinationPiece = this._configuration.getPieceAt(destination);

    if (destinationPiece === null) {
      return false;
    }

    if (destinationPiece.colour !== this._piece.colour) {
      return false;
    }

    return true;
  }

  hasAllyOnTen(): boolean | undefined {
    const destination = this._piecePosition.left.left.front;

    if (!destination.isWithinBoundary()) {
      return undefined;
    }

    const destinationPiece = this._configuration.getPieceAt(destination);

    if (destinationPiece === null) {
      return false;
    }

    if (destinationPiece.colour !== this._piece.colour) {
      return false;
    }

    return true;
  }

  hasAllyOnEleven(): boolean | undefined {
    const destination = this._piecePosition.front.front.left;

    if (!destination.isWithinBoundary()) {
      return undefined;
    }

    const destinationPiece = this._configuration.getPieceAt(destination);

    if (destinationPiece === null) {
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

    let currentPosition = this._piecePosition;

    while (stepCount > 1) {
      const frontPosition = currentPosition.front;

      if (!frontPosition.isWithinBoundary()) {
        return false;
      }

      const frontPiece = this._configuration.getPieceAt(frontPosition);

      if (frontPiece !== null) {
        return false;
      }

      currentPosition = frontPosition;
      stepCount--;
    }

    // Check final step separately
    const frontPosition = currentPosition.front;

    if (!frontPosition.isWithinBoundary()) {
      return false;
    }

    const frontPiece = this._configuration.getPieceAt(frontPosition);

    if (frontPiece !== null && frontPiece.colour === this._piece.colour) {
      return false;
    }

    return true;
  }

  hasOpenBackLane(stepCount: number): boolean {
    if (stepCount < 1) {
      throw Error('Invalid step count.');
    }

    let currentPosition = this._piecePosition;

    while (stepCount > 1) {
      const backPosition = currentPosition.back;

      if (!backPosition.isWithinBoundary()) {
        return false;
      }

      const backPiece = this._configuration.getPieceAt(backPosition);

      if (backPiece !== null) {
        return false;
      }

      currentPosition = backPosition;
      stepCount--;
    }

    // Check final step separately
    const backPosition = currentPosition.back;

    if (!backPosition.isWithinBoundary()) {
      return false;
    }

    const backPiece = this._configuration.getPieceAt(backPosition);

    if (backPiece !== null && backPiece.colour === this._piece.colour) {
      return false;
    }

    return true;
  }

  hasOpenLeftLane(stepCount: number): boolean {
    if (stepCount < 1) {
      throw Error('Invalid step count.');
    }

    let currentPosition = this._piecePosition;

    while (stepCount > 1) {
      const leftPosition = currentPosition.left;

      if (!leftPosition.isWithinBoundary()) {
        return false;
      }

      const leftPiece = this._configuration.getPieceAt(leftPosition);

      if (leftPiece !== null) {
        return false;
      }

      currentPosition = leftPosition;
      stepCount--;
    }

    // Check final step separately
    const leftPosition = currentPosition.left;

    if (!leftPosition.isWithinBoundary()) {
      return false;
    }

    const leftPiece = this._configuration.getPieceAt(leftPosition);

    if (leftPiece !== null && leftPiece.colour === this._piece.colour) {
      return false;
    }

    return true;
  }

  hasOpenRightLane(stepCount: number): boolean {
    if (stepCount < 1) {
      throw Error('Invalid step count.');
    }

    let currentPosition = this._piecePosition;

    while (stepCount > 1) {
      const rightPosition = currentPosition.right;

      if (!rightPosition.isWithinBoundary()) {
        return false;
      }

      const rightPiece = this._configuration.getPieceAt(rightPosition);

      if (rightPiece !== null) {
        return false;
      }

      currentPosition = rightPosition;
      stepCount--;
    }

    // Check final step separately
    const rightPosition = currentPosition.right;

    if (!rightPosition.isWithinBoundary()) {
      return false;
    }

    const rightPiece = this._configuration.getPieceAt(rightPosition);

    if (rightPiece !== null && rightPiece.colour === this._piece.colour) {
      return false;
    }

    return true;
  }

  hasOpenNorthEastDiagonal(stepCount: number): boolean {
    if (stepCount < 1) {
      throw Error('Invalid step count.');
    }

    let currentPosition = this._piecePosition;

    while (stepCount > 1) {
      const diagonalPosition = currentPosition.front.right;

      if (!diagonalPosition.isWithinBoundary()) {
        return false;
      }

      const diagonalPiece = this._configuration.getPieceAt(diagonalPosition);

      if (diagonalPiece !== null) {
        return false;
      }

      currentPosition = diagonalPosition;
      stepCount--;
    }

    // Check final step separately
    const diagonalPosition = currentPosition.front.right;

    if (!diagonalPosition.isWithinBoundary()) {
      return false;
    }

    const diagonalPiece = this._configuration.getPieceAt(diagonalPosition);

    if (diagonalPiece !== null && diagonalPiece.colour === this._piece.colour) {
      return false;
    }

    return true;
  }

  hasOpenSouthEastDiagonal(stepCount: number): boolean {
    if (stepCount < 1) {
      throw Error('Invalid step count.');
    }

    let currentPosition = this._piecePosition;

    while (stepCount > 1) {
      const diagonalPosition = currentPosition.back.right;

      if (!diagonalPosition.isWithinBoundary()) {
        return false;
      }

      const diagonalPiece = this._configuration.getPieceAt(diagonalPosition);

      if (diagonalPiece !== null) {
        return false;
      }

      currentPosition = diagonalPosition;
      stepCount--;
    }

    // Check final step separately
    const diagonalPosition = currentPosition.back.right;

    if (!diagonalPosition.isWithinBoundary()) {
      return false;
    }

    const diagonalPiece = this._configuration.getPieceAt(diagonalPosition);

    if (diagonalPiece !== null && diagonalPiece.colour === this._piece.colour) {
      return false;
    }

    return true;
  }

  hasOpenSouthWestDiagonal(stepCount: number): boolean {
    if (stepCount < 1) {
      throw Error('Invalid step count.');
    }

    let currentPosition = this._piecePosition;

    while (stepCount > 1) {
      const diagonalPosition = currentPosition.back.left;

      if (!diagonalPosition.isWithinBoundary()) {
        return false;
      }

      const diagonalPiece = this._configuration.getPieceAt(diagonalPosition);

      if (diagonalPiece !== null) {
        return false;
      }

      currentPosition = diagonalPosition;
      stepCount--;
    }

    // Check final step separately
    const diagonalPosition = currentPosition.back.left;

    if (!diagonalPosition.isWithinBoundary()) {
      return false;
    }

    const diagonalPiece = this._configuration.getPieceAt(diagonalPosition);

    if (diagonalPiece !== null && diagonalPiece.colour === this._piece.colour) {
      return false;
    }

    return true;
  }

  hasOpenNorthWestDiagonal(stepCount: number): boolean {
    if (stepCount < 1) {
      throw Error('Invalid step count.');
    }

    let currentPosition = this._piecePosition;

    while (stepCount > 1) {
      const diagonalPosition = currentPosition.front.left;

      if (!diagonalPosition.isWithinBoundary()) {
        return false;
      }

      const diagonalPiece = this._configuration.getPieceAt(diagonalPosition);

      if (diagonalPiece !== null) {
        return false;
      }

      currentPosition = diagonalPosition;
      stepCount--;
    }

    // Check final step separately
    const diagonalPosition = currentPosition.front.left;

    if (!diagonalPosition.isWithinBoundary()) {
      return false;
    }

    const diagonalPiece = this._configuration.getPieceAt(diagonalPosition);

    if (diagonalPiece !== null && diagonalPiece.colour === this._piece.colour) {
      return false;
    }

    return true;
  }

  hasAllyInFront(): boolean | undefined {
    const frontPosition = this._piecePosition.front;

    if (!frontPosition.isWithinBoundary()) {
      return undefined;
    }

    const frontPiece = this._configuration.getPieceAt(frontPosition);

    if (frontPiece !== null && frontPiece.colour === this._piece.colour) {
      return true;
    }

    return false;
  }

  hasAllyBehind(): boolean | undefined {
    const backPosition = this._piecePosition.back;

    if (!backPosition.isWithinBoundary()) {
      return undefined;
    }

    const backPiece = this._configuration.getPieceAt(backPosition);

    if (backPiece !== null && backPiece.colour === this._piece.colour) {
      return true;
    }

    return false;
  }

  hasAllyOnLeft(): boolean | undefined {
    const leftPosition = this._piecePosition.left;

    if (!leftPosition.isWithinBoundary()) {
      return undefined;
    }

    const leftPiece = this._configuration.getPieceAt(leftPosition);

    if (leftPiece !== null && leftPiece.colour === this._piece.colour) {
      return true;
    }

    return false;
  }

  hasAllyOnRight(): boolean | undefined {
    const rightPosition = this._piecePosition.back;

    if (!rightPosition.isWithinBoundary()) {
      return undefined;
    }

    const rightPiece = this._configuration.getPieceAt(rightPosition);

    if (rightPiece !== null && rightPiece.colour === this._piece.colour) {
      return true;
    }

    return false;
  }

  hasAllyFrontLeft(): boolean | undefined {
    const frontLeftPosition = this._piecePosition.back;

    if (!frontLeftPosition.isWithinBoundary()) {
      return undefined;
    }

    const frontLeftPiece = this._configuration.getPieceAt(frontLeftPosition);

    if (
      frontLeftPiece !== null &&
      frontLeftPiece.colour === this._piece.colour
    ) {
      return true;
    }

    return false;
  }

  hasAllyFrontRight(): boolean | undefined {
    const frontRightPosition = this._piecePosition.back;

    if (!frontRightPosition.isWithinBoundary()) {
      return undefined;
    }

    const frontRightPiece = this._configuration.getPieceAt(frontRightPosition);

    if (
      frontRightPiece !== null &&
      frontRightPiece.colour === this._piece.colour
    ) {
      return true;
    }

    return false;
  }

  hasAllyBackLeft(): boolean | undefined {
    const backLeftPosition = this._piecePosition.back;

    if (!backLeftPosition.isWithinBoundary()) {
      return undefined;
    }

    const backLeftPiece = this._configuration.getPieceAt(backLeftPosition);

    if (backLeftPiece !== null && backLeftPiece.colour === this._piece.colour) {
      return true;
    }

    return false;
  }

  hasAllyBackRight(): boolean | undefined {
    const backRightPosition = this._piecePosition.back;

    if (!backRightPosition.isWithinBoundary()) {
      return undefined;
    }

    const backRightPiece = this._configuration.getPieceAt(backRightPosition);

    if (
      backRightPiece !== null &&
      backRightPiece.colour === this._piece.colour
    ) {
      return true;
    }

    return false;
  }
}
