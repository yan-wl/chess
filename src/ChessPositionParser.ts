import ChessPosition from './ChessPosition';
import ChessPositionColumnParser from './ChessPositionColumnParser';
import ChessPositionRowParser from './ChessPositionRowParser';

function isValidRepresentation(representation: string): boolean {
  const re = /^[a-h][1-8]$/i;
  return re.test(representation);
}

/**
 * To parse a serialized chess position
 *
 * @remarks Implemented such that parse(serialize(position)) === position
 *
 * @param representation string that represents a chess position
 * @returns the corresponding chess position if valid, else throws an error
 */
function parse(representation: string): ChessPosition {
  if (!isValidRepresentation(representation)) {
    throw Error('Invalid chess position.');
  }
  const [column, row] = representation.split('');
  return ChessPosition.at(
    ChessPositionColumnParser.parse(column),
    ChessPositionRowParser.parse(row)
  );
}

/**
 * To serialize a chess position
 *
 * @remarks Implemented such that position === parse(serialize(position))
 *
 * @param position chess position to serialize
 * @returns string that can parsed back into the original object
 */
function serialize(position: ChessPosition): string {
  return `${ChessPositionColumnParser.serialize(
    position.column
  )}${ChessPositionRowParser.serialize(position.row)}`;
}

export default {
  parse,
  serialize
};
