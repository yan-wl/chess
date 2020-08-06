import ChessPiece from './ChessPiece';
import { PieceType } from './PieceType';
import { Move } from './Move';

export default class NullPiece extends ChessPiece {
  get type(): PieceType {
    return PieceType.NULL;
  }

  clone(): NullPiece {
    const clone = new NullPiece(this.colour);
    clone.position = this.position;
    clone.id = this.id;
    return clone;
  }

  getNonAttackingMoves(): Move[] {
    return [];
  }
  getAttackingMoves(): Move[] {
    return [];
  }
}
