import { ChessPositionRow } from "./ChessPositionRow";
import { ChessPositionColumn } from "./ChessPositionColumn";
import { BoardMove } from "./BoardMove";
import { PrimitiveMove } from "./PrimitiveMove";

export default class ChessPosition {
  private _column: ChessPositionColumn;
  private _row: ChessPositionRow;

  constructor(column: ChessPositionColumn, row: ChessPositionRow) {
    this._column = column;
    this._row = row;
  }

  get front(): ChessPosition {
    const frontColumn = this._column;
    let frontRow: ChessPositionRow;

    switch(this._row) {
      case ChessPositionRow.ONE:
        frontRow = ChessPositionRow.TWO;
        break;
      case ChessPositionRow.TWO: 
        frontRow = ChessPositionRow.THREE;
        break;
      case ChessPositionRow.THREE:
        frontRow = ChessPositionRow.FOUR;
        break;
      case ChessPositionRow.FOUR:
        frontRow = ChessPositionRow.FIVE;
        break;
      case ChessPositionRow.FIVE:
        frontRow = ChessPositionRow.SIX;
        break;
      case ChessPositionRow.SIX: 
        frontRow = ChessPositionRow.SEVEN;
        break;
      case ChessPositionRow.SEVEN: 
        frontRow = ChessPositionRow.EIGHT;
        break;
      case ChessPositionRow.EIGHT: 
        frontRow = ChessPositionRow.EIGHT;
        break;
    }

    return new ChessPosition(frontColumn, frontRow);
  }

  get back(): ChessPosition {
    const backColumn = this._column;
    let backRow: ChessPositionRow;

    switch(this._row) {
      case ChessPositionRow.ONE:
        backRow = ChessPositionRow.ONE;
        break;
      case ChessPositionRow.TWO: 
        backRow = ChessPositionRow.ONE;
        break;
      case ChessPositionRow.THREE:
        backRow = ChessPositionRow.TWO;
        break;
      case ChessPositionRow.FOUR:
        backRow = ChessPositionRow.THREE;
        break;
      case ChessPositionRow.FIVE:
        backRow = ChessPositionRow.FOUR;
        break;
      case ChessPositionRow.SIX: 
        backRow = ChessPositionRow.FIVE;
        break;
      case ChessPositionRow.SEVEN: 
        backRow = ChessPositionRow.SIX;
        break;
      case ChessPositionRow.EIGHT: 
        backRow = ChessPositionRow.SEVEN;
        break;
    }

    return new ChessPosition(backColumn, backRow);
  }

  get left(): ChessPosition {
    const leftRow = this._row;
    let leftColumn: ChessPositionColumn;

    switch(this._column) {
      case ChessPositionColumn.A:
        leftColumn = ChessPositionColumn.A;
        break;
      case ChessPositionColumn.B:
        leftColumn = ChessPositionColumn.A;
        break;
      case ChessPositionColumn.C:
        leftColumn = ChessPositionColumn.B;
        break;
      case ChessPositionColumn.D:
        leftColumn = ChessPositionColumn.C;
        break;
      case ChessPositionColumn.E:
        leftColumn = ChessPositionColumn.D;
        break;
      case ChessPositionColumn.F:
        leftColumn = ChessPositionColumn.E;
        break;
      case ChessPositionColumn.G:
        leftColumn = ChessPositionColumn.F;
        break;
      case ChessPositionColumn.H:
        leftColumn = ChessPositionColumn.G;
        break;
    }

    return new ChessPosition(leftColumn, leftRow);
  }

  get right(): ChessPosition {
    const rightRow = this._row;
    let rightColumn: ChessPositionColumn;

    switch(this._column) {
      case ChessPositionColumn.A:
        rightColumn = ChessPositionColumn.B;
        break;
      case ChessPositionColumn.B:
        rightColumn = ChessPositionColumn.C;
        break;
      case ChessPositionColumn.C:
        rightColumn = ChessPositionColumn.D;
        break;
      case ChessPositionColumn.D:
        rightColumn = ChessPositionColumn.E;
        break;
      case ChessPositionColumn.E:
        rightColumn = ChessPositionColumn.F;
        break;
      case ChessPositionColumn.F:
        rightColumn = ChessPositionColumn.G;
        break;
      case ChessPositionColumn.G:
        rightColumn = ChessPositionColumn.H;
        break;
      case ChessPositionColumn.H:
        rightColumn = ChessPositionColumn.H;
        break;
    }

    return new ChessPosition(rightColumn, rightRow);
  }

  apply(steps: BoardMove): ChessPosition {
    if (steps.length === 0) {
      return this;
    }

    const nextStep = steps[0];
    const remainingSteps = steps.slice(1);

    switch(nextStep) {
      case PrimitiveMove.UP:
        return this.front.apply(remainingSteps);
      case PrimitiveMove.DOWN:
        return this.back.apply(remainingSteps);
      case PrimitiveMove.LEFT:
        return this.left.apply(remainingSteps);
      case PrimitiveMove.RIGHT:
        return this.right.apply(remainingSteps);
    }
  }

  sameAs(otherPosition: ChessPosition): boolean {
    return this._column === otherPosition._column && this._row === otherPosition._row;
  }

  toString(): string {
    return `Row: ${this._row}, Column: ${this._column}`;
  }
}