export interface Square {
  row: number;
  col: number;
  value?: "rook" | "knight" | "bishop" | "queen" | "king" | "pawn" | undefined;
  color?: "w" | "b" | undefined;
  current: boolean;
  valid: boolean;
  empty: boolean;
  kill: boolean;
}

export type Piece = "king" | "queen" | "pawn" | "rook" | "knight" | "bishop";
