import { Piece } from './piece';

export interface Square {
  color: Color;
  position: Position;
  active: boolean;
  hint: boolean;
  piece: Piece | null;
}

interface Position {
  x: number;
  y: number;
}

export enum Color {
  WHITE,
  BLACK,
}
