import { ChessPositionColumn } from './ChessPositionColumn';

function isValidRepresentation(representation: string): boolean {
  const re = /^[a-h]$/i;
  return re.test(representation);
}

/**
 * To parse a serialized chess position column
 *
 * @remarks Implemented such that parse(serialize(column)) === column
 *
 * @param representation string that represents a chess position column
 * @returns the corresponding column if valid, else throws an error
 */
function parse(representation: string): ChessPositionColumn {
  if (!isValidRepresentation(representation)) {
    throw Error('Invalid column position.');
  }

  switch (representation.toUpperCase()) {
    case 'A':
      return ChessPositionColumn.A;
    case 'B':
      return ChessPositionColumn.B;
    case 'C':
      return ChessPositionColumn.C;
    case 'D':
      return ChessPositionColumn.D;
    case 'E':
      return ChessPositionColumn.E;
    case 'F':
      return ChessPositionColumn.F;
    case 'G':
      return ChessPositionColumn.G;
    case 'H':
      return ChessPositionColumn.H;
    default:
      throw Error('Incorrect parser validation.');
  }
}

/**
 * To serialize a chess position column
 *
 * @remarks Implemented such that column === parse(serialize(column))
 *
 * @param column chess position column to serialize
 * @returns string that can be parsed back into the same object
 */
function serialize(column: ChessPositionColumn): string {
  switch (column) {
    case ChessPositionColumn.A:
      return 'A';
    case ChessPositionColumn.B:
      return 'B';
    case ChessPositionColumn.C:
      return 'C';
    case ChessPositionColumn.D:
      return 'D';
    case ChessPositionColumn.E:
      return 'E';
    case ChessPositionColumn.F:
      return 'F';
    case ChessPositionColumn.G:
      return 'G';
    case ChessPositionColumn.H:
      return 'H';
    case ChessPositionColumn.OUTSIDE:
      throw Error('Attempting to serialize an out of bounds position.');
  }
}

export default {
  parse,
  serialize
};
