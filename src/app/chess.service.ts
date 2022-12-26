import { Injectable } from '@angular/core';
import { Piece } from './piece';
import { Color, Square } from './square';

// chess.service.ts
@Injectable({
  providedIn: 'root',
})
export class ChessService {
  board: Square[][] = [];
  activeSquare: Square | null = null;

  constructor() {
    this.makeBoard();
  }

  private makeBoard() {
    for (let i = 0; i < 8; i++) {
      this.board.push([]);
      var counter = i;

      for (let j = 0; j < 8; j++) {
        if (counter % 2 == 0) {
          var color = Color.WHITE;
        } else color = Color.BLACK;

        var active = false;
        var hint = false;
        var piece = null;
        var position = { x: j, y: i };
        let square: Square = { color, position, active, hint, piece };
        this.board[i].push(square);

        counter++;
      }
    }

    this.board[7][6].piece = Piece.KNIGHT;
  }

  getSquareNumber(square: Square): number {
    return 8 - square.position.y;
  }
  getSquareName(square: Square): String {
    var n = square.position.x;
    var chr = String.fromCharCode(97 + n); // where n is 0, 1, 2 ...
    return chr;
  }

  resetOverlay() {
    this.board.forEach((i) =>
      i.forEach((j) => {
        if (j.active || j.hint) {
          j.active = false;
          j.hint = false;
        }
      })
    );
    this.activeSquare = null;
  }

  public resetBoard() {
    this.board.splice(0);
    this.makeBoard();
  }
}
