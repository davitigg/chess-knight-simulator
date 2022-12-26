import { Component } from '@angular/core';
import { ChessService } from '../chess.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  constructor(
    public messageService: MessageService,
    public chessService: ChessService
  ) {}

}
