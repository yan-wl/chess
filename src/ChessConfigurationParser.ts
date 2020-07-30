import ChessConfiguration from './ChessConfiguration';
import ChessPieceParser from './ChessPieceParser';
import ChessPosition from './ChessPosition';
import ChessPositionColumnParser from './ChessPositionColumnParser';
import ChessPositionRowParser from './ChessPositionRowParser';
import ChessPiece from './ChessPiece';
import ChessPositionParser from './ChessPositionParser';

function isValidRepresentation(representation: string): boolean {
  const re = /^\s*(([wb][kqrbnpo]){8}\s+){7}([wb][kqrbnpo]){8}\s*$/i;
  return re.test(representation);
}

/**
 * To parse a serialized chess configuration
 *
 * @remarks Implemented such that parse(serialize(configuration)) === configuration
 *
 * @param representation string that represents a chess configuration
 * @returns the corresponding chess configuration if valid, else throws an error
 */
function parse(representation: string): ChessConfiguration {
  if (!isValidRepresentation(representation)) {
    throw Error('Invalid chess configuration.');
  }
  const orderedPieces = representation.replace(/\s/g, '').match(/.{2}/g);

  if (orderedPieces === null) {
    throw Error('Invalid chess configuration.');
  }

  let index = 0;
  const positionMap = new Map<ChessPosition, ChessPiece | null>();

  ['8', '7', '6', '5', '4', '3', '2', '1'].forEach((row) => {
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach((column) => {
      const pieceRepr = orderedPieces[index];

      const position = ChessPosition.at(
        ChessPositionColumnParser.parse(column),
        ChessPositionRowParser.parse(row)
      );
      const piece = ChessPieceParser.parse(pieceRepr);

      positionMap.set(position, piece);

      index++;
    });
  });

  return new ChessConfiguration(positionMap);
}

/**
 * To serialize a chess configuration
 *
 * @remarks Implemented such that configuration === parse(serialize(configuration))
 *
 * @param configuration chess configuration to serialize
 * @returns string that represents the original configuration
 */
function serialize(configuration: ChessConfiguration): string {
  let result = '';

  [...configuration.positionMap.entries()]
    .map<[string, string]>(([position, piece]) => [
      ChessPositionParser.serialize(position),
      ChessPieceParser.serialize(piece)
    ])
    .sort((first, second) => {
      const [firstColumn, firstRow] = first[0].split('');
      const [secondColumn, secondRow] = second[0].split('');

      if (firstRow > secondRow) {
        return -1;
      } else if (firstRow < secondRow) {
        return 1;
      } else if (firstColumn < secondColumn) {
        return -1;
      } else {
        return 1;
      }
    })
    .forEach((positionPieceTuple) => {
      const serializedPiece: string = positionPieceTuple[1];
      result += serializedPiece;
    });

  // Split result into 8 rows
  const rows = result.match(new RegExp('.{' + result.length / 8 + '}', 'g'));

  if (rows === null) {
    throw Error('Regex error.');
  }

  result = rows.join('\n');

  return result;
}

export default {
  parse,
  serialize
};
