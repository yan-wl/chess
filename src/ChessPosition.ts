import { ChessPositionRow } from './ChessPositionRow';
import { ChessPositionColumn } from './ChessPositionColumn';
import { Steps } from './Move';
import { RelativePosition } from './RelativePosition';
import { Orientation } from './Orientation';

const cachedPositions = new Map<string, ChessPosition>();

export default class ChessPosition {
  private _column: ChessPositionColumn;
  private _row: ChessPositionRow;

  static at(column: ChessPositionColumn, row: ChessPositionRow): ChessPosition {
    const position = new ChessPosition(column, row);

    const cachedPosition = cachedPositions.get(position.hash);

    if (cachedPosition === undefined) {
      cachedPositions.set(position.hash, position);
      return position;
    }

    return cachedPosition;
  }

  private constructor(column: ChessPositionColumn, row: ChessPositionRow) {
    this._column = column;
    this._row = row;
  }

  get row(): ChessPositionRow {
    return this._row;
  }

  get column(): ChessPositionColumn {
    return this._column;
  }

  private get up(): ChessPosition {
    if (!this.isWithinBoundary()) {
      return this;
    }

    const column = this._column;
    let row: ChessPositionRow;

    switch (this._row) {
      case ChessPositionRow.ONE:
        row = ChessPositionRow.TWO;
        break;
      case ChessPositionRow.TWO:
        row = ChessPositionRow.THREE;
        break;
      case ChessPositionRow.THREE:
        row = ChessPositionRow.FOUR;
        break;
      case ChessPositionRow.FOUR:
        row = ChessPositionRow.FIVE;
        break;
      case ChessPositionRow.FIVE:
        row = ChessPositionRow.SIX;
        break;
      case ChessPositionRow.SIX:
        row = ChessPositionRow.SEVEN;
        break;
      case ChessPositionRow.SEVEN:
        row = ChessPositionRow.EIGHT;
        break;
      case ChessPositionRow.EIGHT:
        row = ChessPositionRow.OUTSIDE;
        break;
      default:
        throw Error('Error in boundary handling.');
    }

    return ChessPosition.at(column, row);
  }

  private get down(): ChessPosition {
    if (!this.isWithinBoundary()) {
      return this;
    }

    const column = this._column;
    let row: ChessPositionRow;

    switch (this._row) {
      case ChessPositionRow.ONE:
        row = ChessPositionRow.OUTSIDE;
        break;
      case ChessPositionRow.TWO:
        row = ChessPositionRow.ONE;
        break;
      case ChessPositionRow.THREE:
        row = ChessPositionRow.TWO;
        break;
      case ChessPositionRow.FOUR:
        row = ChessPositionRow.THREE;
        break;
      case ChessPositionRow.FIVE:
        row = ChessPositionRow.FOUR;
        break;
      case ChessPositionRow.SIX:
        row = ChessPositionRow.FIVE;
        break;
      case ChessPositionRow.SEVEN:
        row = ChessPositionRow.SIX;
        break;
      case ChessPositionRow.EIGHT:
        row = ChessPositionRow.SEVEN;
        break;
      default:
        throw Error('Error in boundary handling.');
    }

    return ChessPosition.at(column, row);
  }

  private get left(): ChessPosition {
    if (!this.isWithinBoundary()) {
      return this;
    }

    const row = this._row;
    let column: ChessPositionColumn;

    switch (this._column) {
      case ChessPositionColumn.A:
        column = ChessPositionColumn.OUTSIDE;
        break;
      case ChessPositionColumn.B:
        column = ChessPositionColumn.A;
        break;
      case ChessPositionColumn.C:
        column = ChessPositionColumn.B;
        break;
      case ChessPositionColumn.D:
        column = ChessPositionColumn.C;
        break;
      case ChessPositionColumn.E:
        column = ChessPositionColumn.D;
        break;
      case ChessPositionColumn.F:
        column = ChessPositionColumn.E;
        break;
      case ChessPositionColumn.G:
        column = ChessPositionColumn.F;
        break;
      case ChessPositionColumn.H:
        column = ChessPositionColumn.G;
        break;
      default:
        throw Error('Error in boundary handling.');
    }

    return ChessPosition.at(column, row);
  }

  private get right(): ChessPosition {
    if (!this.isWithinBoundary()) {
      return this;
    }

    const row = this._row;
    let column: ChessPositionColumn;

    switch (this._column) {
      case ChessPositionColumn.A:
        column = ChessPositionColumn.B;
        break;
      case ChessPositionColumn.B:
        column = ChessPositionColumn.C;
        break;
      case ChessPositionColumn.C:
        column = ChessPositionColumn.D;
        break;
      case ChessPositionColumn.D:
        column = ChessPositionColumn.E;
        break;
      case ChessPositionColumn.E:
        column = ChessPositionColumn.F;
        break;
      case ChessPositionColumn.F:
        column = ChessPositionColumn.G;
        break;
      case ChessPositionColumn.G:
        column = ChessPositionColumn.H;
        break;
      case ChessPositionColumn.H:
        column = ChessPositionColumn.OUTSIDE;
        break;
      default:
        throw Error('Error in boundary handling.');
    }

    return ChessPosition.at(column, row);
  }

  /**
   * a unique string for positions with different column or row,
   * and the same string for different instances with same column and row
   */
  get hash(): string {
    return `${this._column}${this._row}`;
  }

  apply(steps: Steps, orientation: Orientation): ChessPosition {
    if (!this.isWithinBoundary()) {
      return this;
    }

    if (steps.length === 0) {
      return this;
    }

    const nextStep = steps[0];
    const remainingSteps = steps.slice(1);

    if (orientation === Orientation.WHITE) {
      switch (nextStep) {
        case RelativePosition.FRONT:
          return this.up.apply(remainingSteps, orientation);
        case RelativePosition.BACK:
          return this.down.apply(remainingSteps, orientation);
        case RelativePosition.LEFT:
          return this.left.apply(remainingSteps, orientation);
        case RelativePosition.RIGHT:
          return this.right.apply(remainingSteps, orientation);
      }
    } else {
      switch (nextStep) {
        case RelativePosition.FRONT:
          return this.down.apply(remainingSteps, orientation);
        case RelativePosition.BACK:
          return this.up.apply(remainingSteps, orientation);
        case RelativePosition.LEFT:
          return this.right.apply(remainingSteps, orientation);
        case RelativePosition.RIGHT:
          return this.left.apply(remainingSteps, orientation);
      }
    }
  }

  isWithinBoundary(): boolean {
    return (
      this._column !== ChessPositionColumn.OUTSIDE &&
      this._row !== ChessPositionRow.OUTSIDE
    );
  }
}
