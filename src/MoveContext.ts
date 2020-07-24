import ChessConfiguration from './ChessConfiguration';
import ChessPosition from './ChessPosition';
import PawnMoveContext from './PawnMoveContext';
import KnightMoveContext from './KnightMoveContext';
import ChessPiece from './ChessPiece';
import RookMoveContext from './RookMoveContext';
import BishopMoveContext from './BishopMoveContext';

export default class MoveContext
  implements
    PawnMoveContext,
    KnightMoveContext,
    RookMoveContext,
    BishopMoveContext {
  private _configuration: ChessConfiguration;
  private _piecePosition: ChessPosition;
  private _piece: ChessPiece;

  constructor(
    configuration: ChessConfiguration,
    piecePosition: ChessPosition,
    piece: ChessPiece
  ) {
    this._configuration = configuration;
    this._piecePosition = piecePosition;
    this._piece = piece;
  }

  pawnHasNotMoved(): boolean {
    throw new Error('Method not implemented.');
  }

  hasPieceInFrontOfPawn(): boolean {
    return this._configuration.isOccupied(this._piecePosition.front);
  }

  hasPieceTwoSquaresInFrontOfPawn(): boolean {
    throw new Error('Method not implemented.');
  }

  leftEnPassantIsAllowed(): boolean {
    throw new Error('Method not implemented.');
  }

  rightEnPassantIsAllowed(): boolean {
    throw new Error('Method not implemented.');
  }

  hasEnemyOnDiagonalLeft(): boolean {
    throw new Error('Method not implemented.');
  }

  hasEnemyOnDiagonalRight(): boolean {
    throw new Error('Method not implemented.');
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
}
