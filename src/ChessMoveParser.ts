import ChessMove from "./ChessMove";
import ChessPositionParser from "./ChessPositionParser";

function isValidRepresentation(representation: string): boolean {
  const re = /^\s*[a-hA-H][1-8]->[a-hA-H][1-8]\s*$/;
  return re.test(representation);
}

function parse(representation: string): ChessMove {
  if (!isValidRepresentation(representation)) {
    throw Error('Invalid chess move.');
  }
  const [source, destination] = representation.trim().split('->');
  return new ChessMove(ChessPositionParser.parse(source), ChessPositionParser.parse(destination));
}

export default {
  parse
};