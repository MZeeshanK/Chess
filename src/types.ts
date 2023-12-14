export type Piece = "king" | "queen" | "pawn" | "rook" | "knight" | "bishop";

export interface Square {
  row: number;
  col: number;
  value?: Piece;
  color?: "w" | "b" | undefined;
  current: boolean;
  valid: boolean;
  empty: boolean;
  kill: boolean;
}

export type LogElementPiece = {
  row: number;
  col: number;
  value?: Piece;
  color?: "w" | "b";
};

export interface LastMoveElement {
  newPos: Square;
  oldPos: Square;
  blackCheck: boolean;
  whiteCheck: boolean;
}

export interface LogElement {
  row: number;
  col: number;
}

export interface State {
  board: Square[][];
  gameOver: {
    type: boolean;
    winner: "w" | "b" | "";
  };
  whiteKill: Piece[];
  blackKill: Piece[];
  turn: "w" | "b";
  whiteCheck: boolean;
  blackCheck: boolean;
  lastMove: LastMoveElement | undefined;
  checkStack: LogElement[];
  whiteKing: {
    row: number;
    col: number;
  };
  blackKing: {
    row: number;
    col: number;
  };
}

export type MoveCallBack = (
  square: Square,
  state: State,
  boundary?: boolean
) => undefined | boolean;

export type CheckCallBack = (
  square: Square,
  state: State,
  checker: Piece,
  target: Square
) => undefined | boolean;

export type ComplexPieces = (
  state: State,
  target: Square,
  cb1?: MoveCallBack,
  cb2?: CheckCallBack,
  checker?: Piece
) => undefined | boolean;

export type SimplePieces = (state: State, target: Square) => void;

export type Node<G> = {
  value: G;
  prev?: Node<G>;
};
