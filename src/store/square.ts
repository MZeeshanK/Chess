import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialState, { Square } from "./ui";

export const squareSlice = createSlice({
  name: "square",
  initialState,
  reducers: {
    toggleCurrent: (state, action: PayloadAction<number>) => {
      const element = state.find((square) => square.pos === action.payload);
      const prevSquare = state.find((square) => square.current);
      if (!element) return;

      if (element && !element.empty) {
        element.current = true;
      }

      if (prevSquare) prevSquare.current = false;

      if (element.value) {
        squareSlice.caseReducers.toggleValid(state, {
          payload: {
            pos: element.pos,
          },
          type: "toggleValid",
        });
      }
    },

    toggleValid: (state, action: PayloadAction<{ pos: number }>) => {
      const { pos } = action.payload;

      const element = state.find((square) => square.pos === pos);
      const prevSquares = state.filter((square) => square.valid);

      prevSquares.forEach((square) => (square.valid = false));

      if (!element?.current) return;

      let elements: Square[] = [];

      // Pawn moves
      if (element.value === "pawn") {
        elements = state.filter((square) => {
          if (element.color === "w") {
            if (Math.floor(pos / 10) === 7) {
              if (square.pos === pos - 20) return true;
            }
            if (square.pos === pos - 10) return true;

            if (square.pos === pos - 11 || square.pos === pos - 9) {
              if (square.color === "b") {
                return true;
              }
            }
          }

          if (element.color === "b") {
            if (Math.floor(pos / 10) === 2) {
              if (square.pos === pos + 20) return true;
            }
            if (square.pos === pos + 10) return true;
          }
        });
      }

      // Knight moves
      if (element.value === "knight") {
        elements = state.filter((square) => {
          if (
            (square.pos === pos - 21 ||
              square.pos === pos - 19 ||
              square.pos === pos - 12 ||
              square.pos === pos - 8 ||
              square.pos === pos + 21 ||
              square.pos === pos + 19 ||
              square.pos === pos + 12 ||
              square.pos === pos + 8) &&
            (square.empty ||
              (element.color === "w" && square.color === "b") ||
              (element.color === "b" && square.color === "w"))
          )
            return true;
        });
      }

      if (!elements) return;

      elements.forEach((el) => {
        el.valid = true;
      });
    },

    movePiece: (state, action: PayloadAction<number>) => {
      const element = state.find((square) => square.current);

      if (!element?.value) return;

      const newPos = state.find((square) => square.pos === action.payload);

      if (!newPos) return;
      if (!newPos.valid) return;

      newPos.color = element.color;
      newPos.value = element.value;
      newPos.empty = false;

      delete element.value;
      delete element.color;
      element.empty = true;

      state.forEach((square) => {
        if (square.current) square.current = false;

        if (square.valid) square.valid = false;
      });
    },
  },
});

export default squareSlice.reducer;

export const { toggleCurrent, movePiece } = squareSlice.actions;
