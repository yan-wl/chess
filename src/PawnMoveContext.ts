export default interface PawnMoveContext {
  pawnHasNotMoved(): boolean;
  hasPieceInFrontOfPawn(): boolean;
  hasPieceTwoSquaresInFrontOfPawn(): boolean;
  leftEnPassantIsAllowed(): boolean;
  rightEnPassantIsAllowed(): boolean;
  hasEnemyOnDiagonalLeft(): boolean;
  hasEnemyOnDiagonalRight(): boolean;
}
