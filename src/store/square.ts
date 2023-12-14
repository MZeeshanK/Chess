import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialState from "./ui";
import { Square, State, LastMoveElement } from "../types";
import {
  bishopMoves,
  rookMoves,
  validRules,
  kingMoves,
  knightMoves,
  pawnMoves,
  checkSquare,
} from "./rules";
import { Stack } from "./Stack";

const startState: State = {
  board: initialState,
  gameOver: {
    type: false,
    winner: "",
  },
  whiteKill: [],
  blackKill: [],
  turn: "w",
  whiteCheck: false,
  blackCheck: false,
  lastMove: undefined,
  checkStack: [],
  whiteKing: {
    row: 7,
    col: 4,
  },
  blackKing: {
    row: 0,
    col: 4,
  },
};

const stack = new Stack<LastMoveElement>();

export const squareSlice = createSlice({
  name: "square",
  initialState: startState,

  reducers: {
    toggleCurrent: (
      state,
      action: PayloadAction<{ row: number; col: number }>
    ) => {
      const { row, col } = action.payload;
      const element = state.board[row][col];

      for (let i: number = 0; i <= 7; i++) {
        const el = state.board[i].find((square) => square.current);

        if (el) {
          if (el.row === element.row && el.col === element.col) break;
          el.current = false;
        }
      }

      if (!element.empty) {
        if (element.current) element.current = false;
        else element.current = true;
      }

      if (element.value) {
        squareSlice.caseReducers.toggleValid(state, {
          payload: {
            row: element.row,
            col: element.col,
          },
          type: "toggleValid",
        });
      }
    },

    toggleValid: (
      state,
      action: PayloadAction<{ row: number; col: number }>
    ) => {
      const { row, col } = action.payload;

      const element = state.board[row][col];
      const prevSquares: Square[] = [];

      for (let i: number = 0; i <= 7; i++) {
        state.board[i].forEach((square) => {
          if (square.valid || square.kill) prevSquares.push(square);
        });
      }

      // remove previous valid squares
      prevSquares.forEach((square) => {
        square.valid = false;
        square.kill = false;
      });

      if (!element?.current) return;

      // Pawn moves
      switch (element.value) {
        case "pawn":
          pawnMoves(state, element);
          break;

        case "rook":
          rookMoves(state, element, validRules);
          break;

        case "knight":
          knightMoves(state, element);
          break;

        case "bishop":
          bishopMoves(state, element, validRules);
          break;

        case "queen":
          rookMoves(state, element, validRules);
          bishopMoves(state, element, validRules);
          break;

        case "king":
          kingMoves(state, element);
          break;

        default:
          break;
      }
    },

    // Move the piece only to the squares which are valid or kill
    movePiece: (state, action: PayloadAction<{ row: number; col: number }>) => {
      const { row, col } = action.payload;
      let element;

      for (let i: number = 0; i <= 7; i++) {
        element = state.board[i].find((square) => square.current) as Square;
        if (element) break;
      }

      if (!element?.value) return;

      const newPos: Square = state.board[row][col];

      if (!newPos) return;
      if (!newPos.valid && !newPos.kill) return;

      if (newPos.kill && newPos.value) {
        if (state.turn === "w") state.whiteKill.push(newPos.value);
        else state.blackKill.push(newPos.value);
      }

      console.log(state.blackCheck);

      const stackOld = { ...element, current: false };
      const stackNew = { ...newPos, valid: false, kill: false };

      // castle move function
      if (newPos.color === element.color) {
        let kingPlace: Square;
        let rookPlace: Square;
        if (col > element.col) {
          kingPlace = state.board[row][col - 1];
          rookPlace = state.board[row][col - 2];
        } else {
          kingPlace = state.board[row][col + 1];
          rookPlace = state.board[row][col + 2];
        }

        kingPlace.color = element.color;
        kingPlace.value = element.value;
        kingPlace.empty = false;

        rookPlace.color = newPos.color;
        rookPlace.value = newPos.value;
        rookPlace.empty = false;

        delete newPos.color;
        delete newPos.value;
        newPos.empty = true;
      } else {
        newPos.color = element.color;
        newPos.value = element.value;
        newPos.empty = false;
      }

      if (newPos.value === "king" && newPos.color === "w")
        state.whiteKing = { row: newPos.row, col: newPos.col };
      if (newPos.value === "king" && newPos.color === "b")
        state.blackKing = { row: newPos.row, col: newPos.col };

      if (element.value === "pawn") {
        // for white pawn to queen
        if (element.color === "w" && row === 0) newPos.value = "queen";

        // for black pawn to queen
        if (element.color === "b" && row === 7) newPos.value = "queen";
      }

      delete element.value;
      delete element.color;
      element.empty = true;

      state.board.forEach((row) => {
        row.forEach((square) => {
          square.current = false;
          square.valid = false;
          square.kill = false;
        });
      });

      // squareSlice.caseReducers.kingCheck(state);

      stack.push({
        oldPos: stackOld,
        newPos: stackNew,
        blackCheck: state.blackCheck,
        whiteCheck: state.whiteCheck,
      });

      if (state.turn === "w") state.turn = "b";
      else state.turn = "w";
    },
    // reset the game for a new game
    resetGame: (state) => {
      state.board = initialState;
      state.gameOver = {
        type: false,
        winner: "",
      };
      state.whiteKill = [];
      state.blackKill = [];
      state.turn = "w";
      state.whiteCheck = false;
      state.blackCheck = false;
      state.lastMove = undefined;
      state.checkStack = [];
      state.whiteKing = {
        row: 7,
        col: 4,
      };
      state.blackKing = {
        row: 0,
        col: 4,
      };
    },

    // Undo the previous move until the board is reset
    undoMove: (state) => {
      if (!stack.peek()) return;

      const { newPos, oldPos } = stack.pop();

      state.board.forEach((row) => {
        row.forEach((square) => {
          if (square.current) {
            squareSlice.caseReducers.toggleCurrent(state, {
              payload: {
                row: square.row,
                col: square.col,
              },
              type: "toggleCurrent",
            });
          }
        });
      });

      // castle move undo
      if (newPos.color === oldPos.color) {
        let square1: Square;
        let square2: Square;

        const { row, col } = newPos;

        if (col > oldPos.col) {
          square1 = state.board[row][col - 1];
          square2 = state.board[row][col - 2];
        } else {
          square1 = state.board[row][col + 1];
          square2 = state.board[row][col + 2];
        }

        delete square1.color;
        delete square1.value;
        square1.empty = true;

        delete square2.color;
        delete square2.value;
        square2.empty = true;
      }

      state.board[newPos.row][newPos.col] = newPos;
      state.board[oldPos.row][oldPos.col] = oldPos;

      state.lastMove = stack.peek();
      if (state.turn === "w") {
        state.turn = "b";
        if (!newPos.empty) state.blackKill.pop();
      } else {
        state.turn = "w";
        if (!newPos.empty) state.whiteKill.pop();
      }
    },
    // kingCheck: (state) => {
    //   const { row: bRow, col: bCol } = state.blackKing;
    //   const { row: wRow, col: wCol } = state.blackKing;

    //   const blackKing = state.board[bRow][bCol];
    //   const whiteKing = state.board[wRow][wCol];

    //   if (
    //     bishopMoves(state, blackKing, undefined, checkSquare, "queen") ||
    //     bishopMoves(state, blackKing, undefined, checkSquare, "bishop") ||
    //     bishopMoves(state, whiteKing, undefined, checkSquare, "queen") ||
    //     bishopMoves(state, whiteKing, undefined, checkSquare, "bishop") ||
    //     rookMoves(state, blackKing, undefined, checkSquare, "queen") ||
    //     rookMoves(state, blackKing, undefined, checkSquare, "rook") ||
    //     rookMoves(state, whiteKing, undefined, checkSquare, "queen") ||
    //     rookMoves(state, whiteKing, undefined, checkSquare, "rook")
    //   ) {
    //     return;
    //   }

    //   knightMoves(state, blackKing);
    // },
  },
});

export default squareSlice.reducer;

export const { toggleCurrent, movePiece, resetGame, undoMove } =
  squareSlice.actions;
