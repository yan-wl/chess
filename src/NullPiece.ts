import ChessPiece from './ChessPiece';
import { PieceType } from './PieceType';
import { Move } from './Move';
import MoveContext from './MoveContext';

export default class NullPiece extends ChessPiece {
  get type(): PieceType {
    return PieceType.NULL;
  }

  clone(): NullPiece {
    const clone = new NullPiece(this.colour);
    clone.position = this.position;
    return clone;
  }

  getNonAttackingMoves(): Move[] {
    return [];
  }
  getAttackingMoves(): Move[] {
    return [];
  }
}
