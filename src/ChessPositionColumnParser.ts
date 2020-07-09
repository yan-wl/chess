import { ChessPositionColumn } from "./ChessPositionColumn";

function isValidRepresentation(representation: string): boolean {
  const re = /^[A-H]|[a-h]$/;
  return re.test(representation);
}

function parse(representation: string): ChessPositionColumn {
  if (!isValidRepresentation(representation)) {
    throw Error('Invalid column position.');
  }

  switch(representation.toUpperCase()) {
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
      throw Error('Invalid column position.');
  }
}

export default {
  parse
};