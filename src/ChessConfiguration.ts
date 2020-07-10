import ChessSquare from "./ChessSquare";
import ChessPosition from "./ChessPosition";
import ChessPiece from "./ChessPiece";
import ChessMove from "./ChessMove";
import InvisiblePiece from "./InvisiblePiece";

export default class ChessConfiguration {
  /*
    NOT TO BE CONFUSED WITH LIGHT AND DARK SQUARES!
    Black squares hold black pieces. White squares hold white pieces.
  */
  private _blackSquares: ChessSquare[];
  private _whiteSquares: ChessSquare[];

  constructor(blackSquares: ChessSquare[], whiteSquares: ChessSquare[]) {
    this._blackSquares = blackSquares;
    this._whiteSquares = whiteSquares;
  }

  get squares(): ChessSquare[] {
    return this._blackSquares.concat(this._whiteSquares);
  }

  isOccupied(position: ChessPosition): boolean {
    const correspondingSquare = this.squares.find(square => square.position.sameAs(position));
    
    if (correspondingSquare === undefined) {
      throw Error('Invalid square.');
    }

    return correspondingSquare.isOccupied();
  }

  getPieceAt(position: ChessPosition): ChessPiece {
    const correspondingSquare = this.squares.find(square => square.position.sameAs(position));

    if (correspondingSquare === undefined) {
      throw Error('Invalid position.');
    }

    return correspondingSquare.piece;
  }

  apply(chessMove: ChessMove): ChessConfiguration {
    /*
      This is disgusting.
      TODO: Improve.
    */
    const sourceSquare = this.squares.find(square => square.position.sameAs(chessMove.source));

    if (sourceSquare === undefined) {
      throw Error('Invalid move.');
    }

    const destinationSquare = this.squares.find(square => square.position.sameAs(chessMove.destination));

    if (destinationSquare === undefined) {
      throw Error('Invalid move.');
    }
    
    const newDestionationSquare = destinationSquare.place(sourceSquare.piece);
    const newSourceSquare = sourceSquare.place(new InvisiblePiece());

    const sourceColour = this._blackSquares.includes(sourceSquare) ? 'b' : 'w';

    const newBlackSquares = this._blackSquares.slice().filter(square => square !== sourceSquare && square !== destinationSquare);
    const newWhiteSquares = this._whiteSquares.slice().filter(square => square !== sourceSquare && square !== destinationSquare);

    if (sourceColour === 'w') {
      newWhiteSquares.push(newSourceSquare, newDestionationSquare);
    } else {
      newBlackSquares.push(newSourceSquare, newDestionationSquare);
    }

    return new ChessConfiguration(newBlackSquares, newWhiteSquares);
  }

  toString(): string {
    let result = '';
    result += 'Black Squares:\n';
    this._blackSquares.forEach(square => {
      result += square.toString();
      result += '\n';
    });
    result += 'White Squares:\n';
    this._whiteSquares.forEach(square => {
      result += square.toString();
      result += '\n';
    });
    return result;
  }
}