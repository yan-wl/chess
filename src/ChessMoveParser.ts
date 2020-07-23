import ChessMove from "./ChessMove";
import ChessPositionParser from "./ChessPositionParser";

function isValidRepresentation(representation: string): boolean {
  const re = /^\s*[a-h][1-8]->[a-h][1-8]\s*$/i;
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
  if (!isValidRepresentation(representation)) {
    throw Error('Invalid chess move.');
  }
  const [source, destination] = representation.trim().split('->');
  return new ChessMove(ChessPositionParser.parse(source), ChessPositionParser.parse(destination));
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
  return `${ChessPositionParser.serialize(move.source)}->${ChessPositionParser.serialize(move.destination)}`;
}

export default {
  parse,
  serialize
};