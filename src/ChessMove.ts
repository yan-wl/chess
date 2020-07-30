import ChessPosition from './ChessPosition';
import ChessPiece from './ChessPiece';

export default class ChessMove {
  private _source: ChessPosition;
  private _destination: ChessPosition;
  private _promotionPiece: ChessPiece | null;

  constructor(
    source: ChessPosition,
    destination: ChessPosition,
    promotionPiece: ChessPiece | null
  ) {
    this._source = source;
    this._destination = destination;
    this._promotionPiece = promotionPiece;
  }

  get source(): ChessPosition {
    return this._source;
  }

  get destination(): ChessPosition {
    return this._destination;
  }

  get promotionPiece(): ChessPiece | null {
    return this._promotionPiece;
  }
}
