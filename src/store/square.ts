import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialState from "./ui";
import { Square, Piece } from "../types";
import { validRules } from "./functions";

interface logElement {
  newPos: Square;
  oldPos: Square;
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
  logStack: logElement[];
}

export const squareSlice = createSlice({
  name: "square",
  initialState: {
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
    logStack: [],
  } as State,

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

      const rookMoves = (): void => {
        let i: number = 1;

        // Forward movement
        while (row - i >= 0) {
          const square = state.board[row - i][col];

          if (validRules(square, state, true)) break;
          i++;
        }

        i = 1;
        // Backward movement
        while (row + i <= 7) {
          const square = state.board[row + i][col];

          if (validRules(square, state, true)) break;
          i++;
        }

        i = 1;
        // Right movement
        while (col + i <= 7) {
          const square = state.board[row][col + i];

          if (validRules(square, state, true)) break;
          i++;
        }

        // Left movement
        i = 1;
        while (col - i >= 0) {
          const square = state.board[row][col - i];

          if (validRules(square, state, true)) break;
          i++;
        }
      };

      const bishopMoves = () => {
        let i = 1;

        // Top Right
        while (row - i >= 0 && col + i <= 7) {
          const square = state.board[row - i][col + i] as Square;

          if (validRules(square, state, true)) break;
          i++;
        }

        i = 1;
        // Bottom Right
        while (row + i <= 7 && col + i <= 7) {
          const square = state.board[row + i][col + i] as Square;

          if (validRules(square, state, true)) break;
          i++;
        }

        i = 1;
        // Bottom Left
        while (row + i <= 7 && col - i >= 0) {
          const square = state.board[row + i][col - i] as Square;

          if (validRules(square, state, true)) break;
          i++;
        }

        i = 1;
        // Top Left
        while (row - i >= 0 && col - i >= 0) {
          const square = state.board[row - i][col - i] as Square;

          if (validRules(square, state, true)) break;
          i++;
        }
      };

      // Pawn moves
      switch (element.value) {
        case "pawn":
          let firstSquare: Square | undefined;
          let secondSquare: Square | undefined;

          let nextRow: Square[] = [];

          if (element.color === "w") {
            firstSquare = state.board[row - 1][col];

            if (row === 6) secondSquare = state.board[row - 2][col];

            nextRow = state.board[row - 1];
          }

          if (element.color === "b") {
            firstSquare = state.board[row + 1][col];

            if (row === 1) secondSquare = state.board[row + 2][col];

            nextRow = state.board[row + 1];
          }

          const killSquares: Square[] = [];
          if (col + 1 <= 7) {
            if (nextRow[col + 1].color && nextRow[col + 1].color !== state.turn)
              killSquares.push(nextRow[col + 1]);
          }
          if (col - 1 >= 0) {
            if (nextRow[col - 1].color && nextRow[col - 1].color !== state.turn)
              killSquares.push(nextRow[col - 1]);
          }

          if (killSquares.length) {
            killSquares.forEach((square) => (square.kill = true));
          }

          if (!firstSquare) return;
          if (!firstSquare?.empty) return;

          firstSquare.valid = true;
          if (!secondSquare) return;
          if (!secondSquare?.empty) return;
          secondSquare.valid = true;

          break;

        case "rook":
          rookMoves();

          break;

        case "knight":
          const firstRow = [row + 1, row - 1];
          const secondRow = [row + 2, row - 2];

          const firstCol = [col + 1, col - 1];
          const secondCol = [col + 2, col - 2];

          const knightMoves = (
            firstRow: number[],
            secondCol: number[]
          ): void => {
            firstRow.forEach((knightRow) => {
              if (knightRow > 7) return;
              if (knightRow < 0) return;

              secondCol.forEach((knightCol) => {
                if (knightCol > 7) return;
                if (knightCol < 0) return;

                const square = state.board[knightRow][knightCol];

                validRules(square, state);
              });
            });
          };

          knightMoves(firstRow, secondCol);
          knightMoves(secondRow, firstCol);

          break;

        case "bishop":
          bishopMoves();
          break;

        case "queen":
          rookMoves();
          bishopMoves();
          break;

        case "king":
          for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
              // if (i === row && j === col) break;
              if (i > 7 || i < 0) continue;
              if (j > 7 || j < 0) continue;

              const square = state.board[i][j];

              validRules(square, state);
            }
          }
          break;

        default:
          break;
      }
    },

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

      state.logStack.push({ newPos: { ...newPos }, oldPos: { ...element } });

      newPos.color = element.color;
      newPos.value = element.value;
      newPos.empty = false;

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

      if (state.turn === "w") state.turn = "b";
      else state.turn = "w";
    },
    resetGame: (state) => {
      state.board = initialState;
      state.gameOver = {
        type: false,
        winner: "",
      };
      state.turn = "w";
      state.blackCheck = false;
      state.whiteCheck = false;
      state.blackKill = [];
      state.whiteKill = [];
    },

    undoMove: (state) => {
      if (!state.logStack.length) return;

      const lastLog = state.logStack.pop() as logElement;

      const { newPos, oldPos } = lastLog;

      state.board[newPos.row][newPos.col] = newPos;
      state.board[newPos.row][newPos.col].valid = false;
      state.board[newPos.row][newPos.col].kill = false;
      state.board[oldPos.row][oldPos.col] = oldPos;
      state.board[oldPos.row][oldPos.col].current = false;

      if (state.turn === "w") {
        state.turn = "b";
        if (!newPos.empty) state.blackKill.pop();
      } else {
        state.turn = "w";
        if (!newPos.empty) state.whiteKill.pop();
      }
    },
  },
});

export default squareSlice.reducer;

export const { toggleCurrent, movePiece, resetGame, undoMove } =
  squareSlice.actions;
