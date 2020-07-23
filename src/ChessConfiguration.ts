import ChessPosition from './ChessPosition';
import ChessPiece from './ChessPiece';

export default class ChessConfiguration {
  /*
    NOT TO BE CONFUSED WITH LIGHT AND DARK SQUARES!
    Black squares hold black pieces. White squares hold white pieces.
  */
  private _positionMap: Map<ChessPosition, ChessPiece | null>;

  constructor(positionMap: Map<ChessPosition, ChessPiece | null>) {
    this._positionMap = positionMap;
  }

  get positionMap(): Map<ChessPosition, ChessPiece | null> {
    return this._positionMap;
  }

  isOccupied(position: ChessPosition): boolean {
    const piece = this.getPieceAt(position);

    return piece !== null;
  }

  /**
   * To retrieve the chess piece placed at any position
   *
   * @param position a chess position
   * @returns the chess piece in the position or null if there is none
   * @throws error if the position is unknown
   */
  getPieceAt(position: ChessPosition): ChessPiece | null {
    const piece = this._positionMap.get(position);

    if (piece === undefined) {
      throw Error('Invalid chess position.');
    }

    return piece;
  }

  move(source: ChessPosition, destination: ChessPosition): ChessConfiguration {
    if (!source.isWithinBoundary() || !destination.isWithinBoundary()) {
      throw Error('Invalid move request.');
    }

    const sourcePiece = this.getPieceAt(source);

    const newMap = new Map(this._positionMap);

    newMap.set(destination, sourcePiece);
    newMap.set(source, null);

    return new ChessConfiguration(newMap);
  }
}
