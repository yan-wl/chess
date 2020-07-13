import { PieceColour } from "./PieceColour";

function isValidRepresentation(representation: string): boolean {
  const re = /^[wb]$/i;
  return re.test(representation);
}

function parse(representation: string): PieceColour {
  if (!isValidRepresentation(representation)) {
    throw Error('Invalid piece colour.');
  }

  switch(representation.toUpperCase()) {
    case 'W':
      return PieceColour.WHITE;
    case 'B':
      return PieceColour.BLACK;
    default:
      throw Error('Incorrect parser validation.');
  }
}

export default {
  parse
};