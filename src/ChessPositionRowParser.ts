import { ChessPositionRow } from './ChessPositionRow';

function isValidRepresentation(representation: string): boolean {
  const re = /^[1-8]$/;
  return re.test(representation);
}

/**
 * To parse a serialized chess position row
 *
 * @remarks Implemented such that parse(serialize(row)) === row
 *
 * @param representation string that represents a chess position row
 * @returns the corresponding row if valid, else throws an error
 */
function parse(representation: string): ChessPositionRow {
  if (!isValidRepresentation(representation)) {
    throw Error('Invalid row position.');
  }

  switch (representation) {
    case '1':
      return ChessPositionRow.ONE;
    case '2':
      return ChessPositionRow.TWO;
    case '3':
      return ChessPositionRow.THREE;
    case '4':
      return ChessPositionRow.FOUR;
    case '5':
      return ChessPositionRow.FIVE;
    case '6':
      return ChessPositionRow.SIX;
    case '7':
      return ChessPositionRow.SEVEN;
    case '8':
      return ChessPositionRow.EIGHT;
    default:
      throw Error('Incorrect parser validation.');
  }
}

/**
 * To serialize a chess position row
 *
 * @remarks Implemented such that row === parse(serialize(row))
 *
 * @param row chess position row to serialize
 * @returns string that can be parsed back into the same object
 */
function serialize(row: ChessPositionRow): string {
  switch (row) {
    case ChessPositionRow.ONE:
      return '1';
    case ChessPositionRow.TWO:
      return '2';
    case ChessPositionRow.THREE:
      return '3';
    case ChessPositionRow.FOUR:
      return '4';
    case ChessPositionRow.FIVE:
      return '5';
    case ChessPositionRow.SIX:
      return '6';
    case ChessPositionRow.SEVEN:
      return '7';
    case ChessPositionRow.EIGHT:
      return '8';
    case ChessPositionRow.OUTSIDE:
      throw Error('Attempting to serialize an out of bounds position.');
  }
}

export default {
  parse,
  serialize
};
