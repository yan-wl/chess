import ChessMove from './ChessMove';
import ChessPositionParser from './ChessPositionParser';
import ChessPieceParser from './ChessPieceParser';

function isValidRepresentation(representation: string): boolean {
  const re = /^[a-h][1-8]->[a-h][1-8]([wb][qrnb])?$/i;
  return re.test(representation);
}

/**
 * To parse a serialized chess move
 *
 * @remarks Implemented such that parse(serialize(move)) === move
 *
 * @param representation string that represents a chess move
 * @returns the corresponding chess move if valid, else throws an error
 */
function parse(representation: string): ChessMove {
  const repr = representation.trim();

  if (!isValidRepresentation(repr)) {
    throw Error('Invalid chess move.');
  }

  if (repr.length === 8) {
    const promotion = repr.substring(6, 8);
    const [source, destination] = repr.substring(0, 6).split('->');
    return new ChessMove(
      ChessPositionParser.parse(source),
      ChessPositionParser.parse(destination),
      ChessPieceParser.parse(promotion)
    );
  } else {
    const [source, destination] = repr.split('->');
    return new ChessMove(
      ChessPositionParser.parse(source),
      ChessPositionParser.parse(destination),
      null
    );
  }
}

/**
 * To serialize a chess move
 *
 * @remarks Implemented such that move === parse(serialize(move))
 *
 * @param move chess move to serialize
 * @returns string that represents the original chess move
 */
function serialize(move: ChessMove): string {
  return `${ChessPositionParser.serialize(
    move.source
  )}->${ChessPositionParser.serialize(move.destination)}`;
}

export default {
  parse,
  serialize
};
