import { Component, Input } from '@angular/core';
import { ChessService } from '../chess.service';
import { MessageService } from '../message.service';
import { Piece } from '../piece';
import { PieceService } from '../piece.service';
import { Color, Square } from '../square';

@Component({
  selector: 'app-board-square',
  templateUrl: './board-square.component.html',
  styleUrls: ['./board-square.component.css'],
})
export class BoardSquareComponent {
  @Input()
  square!: Square;

  constructor(
    private chessService: ChessService,
    private pieceService: PieceService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  getSquareNumber() {
    return this.chessService.getSquareNumber(this.square);
  }
  getSquareName() {
    return this.chessService.getSquareName(this.square);
  }

  getPiece(square: Square) {
    return this.pieceService.getPieceUrl(square);
  }

  // activates square and shows hints
  onClick(square: Square) {
    if (square.piece != null) {
      //if clicked on piece
      if (square.active) {
        //if clicked on active piece
        this.chessService.resetOverlay();
      } else {
        //if clicked on inactive piece
        square.active = true;
        this.chessService.activeSquare = square;
        this.pieceService.getPieceMoveHint(square);
      }
    } else if (square.hint) {
      //if clicked on hint

      // for logging
      var pieceName = Piece[this.chessService.activeSquare?.piece!];
      var from = `${this.chessService.getSquareName(
        this.chessService.activeSquare!
      )}${this.chessService.getSquareNumber(this.chessService.activeSquare!)}`;
      var to = `${this.chessService.getSquareName(
        square
      )}${this.chessService.getSquareNumber(square)}`;
      var message = `${pieceName} moves from ${from} to the ${to} square.`;
      this.log(message);

      // action
      this.pieceService.moveKnight(this.chessService.activeSquare!, square);
      this.chessService.activeSquare!.active = false;
      this.chessService.resetOverlay();
    } else {
      //if clicked on blank
      this.chessService.resetOverlay();
    }
  }

  private log(message: string) {
    this.messageService.add(message);
  }

  // for css
  getSquareBackgroundColor() {
    return this.square.color == Color.WHITE ? '#E8EDF9' : '#B7C0D8';
  }

  getSquareTextColor() {
    return this.square.color == Color.WHITE && !this.square.active
      ? '#B7C0D8'
      : '#E8EDF9';
  }
  getCursor() {
    return this.square.piece != null || this.square.hint ? 'pointer' : '';
  }
  getOverlayClass() {
    if (this.square.active) {
      return 'Overlay-Active';
    } else if (this.square.hint) {
      return 'Overlay-Hint ';
    } else return '';
  }
}
