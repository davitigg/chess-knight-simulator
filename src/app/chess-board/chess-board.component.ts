import { Component, OnInit } from '@angular/core';
import { ChessService } from '../chess.service';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css'],
})
export class ChessBoardComponent {
  board = this.chessService.board;

  constructor(private chessService: ChessService) {}

  ngOnInit() {
  }
}
