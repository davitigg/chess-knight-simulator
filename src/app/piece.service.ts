import { Injectable } from '@angular/core';
import { ChessService } from './chess.service';
import { Piece, pieceUrl } from './piece';
import { Square } from './square';

@Injectable({
  providedIn: 'root',
})
export class PieceService {
  constructor(private chessService: ChessService) {}

  getPieceUrl(square: Square) {
    switch (square.piece) {
      case Piece.KNIGHT:
        return pieceUrl.knightWhite;
      default:
        return '';
    }
  }

  getPieceMoveHint(square: Square) {
    switch (square.piece) {
      case Piece.KNIGHT:
        this.getKnightMoves(square);
        break;
      default:
        break;
    }
  }

  private getKnightMoves(square: Square) {
    var x = square.position.x;
    var y = square.position.y;

    var newY = y + 2;
    var newX = x + 1;

    var validMove = (y: number, x: number) =>
      y > -1 && y < 8 && x > -1 && x < 8;

    if (validMove(newY, newX)) {
      this.chessService.board[newY][newX].hint = true;
    }

    newY = y + 2;
    newX = x - 1;
    if (validMove(newY, newX)) {
      this.chessService.board[newY][newX].hint = true;
    }

    newY = y - 2;
    newX = x - 1;
    if (validMove(newY, newX)) {
      this.chessService.board[newY][newX].hint = true;
    }

    newY = y - 2;
    newX = x + 1;
    if (validMove(newY, newX)) {
      this.chessService.board[newY][newX].hint = true;
    }

    newY = y + 1;
    newX = x + 2;
    if (validMove(newY, newX)) {
      this.chessService.board[newY][newX].hint = true;
    }

    newY = y + 1;
    newX = x - 2;
    if (validMove(newY, newX)) {
      this.chessService.board[newY][newX].hint = true;
    }

    newY = y - 1;
    newX = x - 2;
    if (validMove(newY, newX)) {
      this.chessService.board[newY][newX].hint = true;
    }

    newY = y - 1;
    newX = x + 2;
    if (validMove(newY, newX)) {
      this.chessService.board[newY][newX].hint = true;
    }
  }

  public async moveKnight(from: Square, to: Square) {
    var stepY = to.position.y - from.position.y;
    var stepX = to.position.x - from.position.x;
    var dirY = to.position.y > from.position.y ? 1 : -1;
    var dirX = to.position.x > from.position.x ? 1 : -1;

    from.piece = null;
    this.chessService.board[from.position.y + dirY][from.position.x].piece =
      Piece.KNIGHT;
    if (Math.abs(stepY) % 2 == 1) {
      this.delay(250).then(() => {
        this.chessService.board[from.position.y + dirY][from.position.x].piece =
          null;
        this.chessService.board[from.position.y + dirY][
          from.position.x + dirX
        ].piece = Piece.KNIGHT;
      });

      this.delay(500).then(() => {
        this.chessService.board[from.position.y + dirY][
          from.position.x + dirX
        ].piece = null;
        this.chessService.board[from.position.y + dirY][
          from.position.x + dirX + dirX
        ].piece = Piece.KNIGHT;
      });
    } else {
      this.delay(250).then(() => {
        this.chessService.board[from.position.y + dirY][from.position.x].piece =
          null;
        this.chessService.board[from.position.y + dirY + dirY][
          from.position.x
        ].piece = Piece.KNIGHT;
      });

      this.delay(500).then(() => {
        this.chessService.board[from.position.y + dirY + dirY][
          from.position.x
        ].piece = null;
        this.chessService.board[from.position.y + dirY + dirY][
          from.position.x + dirX
        ].piece = Piece.KNIGHT;
      });
    }
  }

  delay(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
}
