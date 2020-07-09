import ChessConfiguration from "./ChessConfiguration";
import ChessPieceParser from "./ChessPieceParser";

export const REGULAR_CONFIG = `
RHBQKBHR
PPPPPPPP
00000000
00000000
00000000
00000000
PPPPPPPP
RHBKQBHR
`;

function isValidRepresentation(representation: string): boolean {
  const re = /^\s*((K|k|Q|q|R|r|B|b|H|h|P|p|0){8}\s+){7}(K|k|Q|q|R|r|B|b|H|h|P|p|0){8}\s*$/;
  return re.test(representation);
}

function parse(representation: string): ChessConfiguration {
  if (!isValidRepresentation(representation)) {
    throw Error('Invalid chess configuration.');
  }
  const rows = representation.trim().split(/\s+/);
  const structure = rows.map(row => row.split('').map(column => ChessPieceParser.parse(column)));
  return new ChessConfiguration(structure);
}

export default {
  parse
};