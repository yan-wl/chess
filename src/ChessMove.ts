import ChessPosition from "./ChessPosition";

export default class ChessMove {
  private _source: ChessPosition;
  private _destination: ChessPosition;

  constructor(source: ChessPosition, destination: ChessPosition) {
    this._source = source;
    this._destination = destination;
  }

  toString(): string {
    return `${this._source.toString()}->${this._destination.toString()}`;
  }
}