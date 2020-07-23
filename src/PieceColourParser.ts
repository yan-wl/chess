import { PieceColour } from './PieceColour';

function isValidRepresentation(representation: string): boolean {
  const re = /^[wb]$/i;
  return re.test(representation);
}

/**
 * To parse a serialized piece colour
 *
 * @remarks Implemented such that parse(serialize(colour)) === colour
 *
 * @param representation string that represents a piece colour
 * @returns the correponding piece colour if valid, else throws an error
 */
function parse(representation: string): PieceColour {
  if (!isValidRepresentation(representation)) {
    throw Error('Invalid piece colour.');
  }

  switch (representation.toUpperCase()) {
    case 'W':
      return PieceColour.WHITE;
    case 'B':
      return PieceColour.BLACK;
    default:
      throw Error('Incorrect parser validation.');
  }
}

/**
 * To serialize a piece colour
 *
 * @remarks Implemented such that colour === parse(serialize(colour))
 *
 * @param colour piece colour to serialize
 * @returns string that represents the piece colour
 */
function serialize(colour: PieceColour): string {
  switch (colour) {
    case PieceColour.BLACK:
      return 'B';
    case PieceColour.WHITE:
      return 'W';
  }
}

export default {
  parse,
  serialize
};
