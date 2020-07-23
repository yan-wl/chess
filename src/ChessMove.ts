import ChessPosition from "./ChessPosition";

export default class ChessMove {
  private _source: ChessPosition;
  private _destination: ChessPosition;

  constructor(source: ChessPosition, destination: ChessPosition) {
    this._source = source;
    this._destination = destination;
  }

  get source(): ChessPosition {
    return this._source;
  }

  get destination(): ChessPosition {
    return this._destination;
  }
}