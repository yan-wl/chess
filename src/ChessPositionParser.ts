import ChessPosition from "./ChessPosition";
import ChessPositionColumnParser from "./ChessPositionColumnParser";
import ChessPositionRowParser from "./ChessPositionRowParser";

function isValidRepresentation(representation: string): boolean {
  const re = /^([A-H]|[a-h])[1-8]$/;
  return re.test(representation);
}

function parse(representation: string): ChessPosition {
  if (!isValidRepresentation(representation)) {
    throw Error('Invalid chess position.');
  }
  const [column, row] = representation.split('');
  return new ChessPosition(ChessPositionColumnParser.parse(column), ChessPositionRowParser.parse(row));
}

export default {
  parse
};