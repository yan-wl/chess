import ChessPiece from './ChessPiece';
import ChessMove from './ChessMove';

export type HistoryRecord = {
  piece: ChessPiece;
  move: ChessMove;
};
