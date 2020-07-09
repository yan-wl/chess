import { ChessPositionRow } from "./ChessPositionRow";

function isValidRepresentation(representation: string): boolean {
  const re = /^[1-8]$/;
  return re.test(representation);
}

function parse(representation: string): ChessPositionRow {
  if (!isValidRepresentation(representation)) {
    throw Error('Invalid row position.');
  }

  switch(representation) {
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
      throw Error('Invalid row position.');
  }
}

export default {
  parse
};