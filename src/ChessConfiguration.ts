import ChessPosition from "./ChessPosition";
import ChessPiece from "./ChessPiece";

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

  getPieceAt(position: ChessPosition): ChessPiece | null {
    const piece = this._positionMap.get(position);

    if (piece === undefined) {
      throw Error('Invalid position.');
    }

    return piece;
  }

  move(source: ChessPosition, destination: ChessPosition): ChessConfiguration {
    const newMap = new Map(this._positionMap);

    newMap.set(destination, this.getPieceAt(source));
    newMap.set(source, null);

    return new ChessConfiguration(newMap);
  }

  toString(): string {
    let result = '';

    for (const [position, piece] of this._positionMap.entries()) {
      result += `[${position.toString()}] ${piece === null ? 'O' : piece.toString()}`;
      result += '\n';
    }

    return result;
  }
}