import { BoardMove } from "./BoardMove";
import MoveContext from "./MoveContext";

export default abstract class ChessPiece {
  abstract isOpaque(): boolean;
  abstract getPossibleMoves(moveContext: MoveContext): BoardMove[];
  abstract toString(): string;
}