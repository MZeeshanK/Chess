import {
  ComplexPieces,
  SimplePieces,
  MoveCallBack,
  Square,
  CheckCallBack,
} from "../types";

export const validRules: MoveCallBack = (square, state, boundary) => {
  if (!square.empty) {
    if (square.color !== state.turn) square.kill = true;
    if (boundary) return true;
  } else square.valid = true;
};

export const checkSquare: CheckCallBack = (
  square,
  state,
  checker,
  target
): undefined | boolean => {
  if (!square.empty) {
    // with piece in the square

    if (square.value === checker && square.color !== target.color) {
      state.blackCheck = true;
      return true;
    } else {
      state.blackCheck = false;
      return false;
    }
  } else {
    state.blackCheck = false;
  }
};

export const bishopMoves: ComplexPieces = (
  state,
  target,
  cb1,
  cb2,
  checker
) => {
  const { row, col } = target;
  let i = 1;

  // Top Right
  while (row - i >= 0 && col + i <= 7) {
    const square = state.board[row - i][col + i] as Square;

    if (cb1) if (cb1(square, state, true)) break;

    if (checker && cb2) {
      const result = cb2(square, state, checker, target);

      if (result) return true;
      if (result === false) break;
    }

    i++;
  }

  i = 1;
  // Bottom Right
  while (row + i <= 7 && col + i <= 7) {
    const square = state.board[row + i][col + i] as Square;

    if (cb1) if (cb1(square, state, true)) break;

    if (checker && cb2) {
      const result = cb2(square, state, checker, target);

      if (result) return true;
      if (result === false) break;
    }

    i++;
  }

  i = 1;
  // Bottom Left
  while (row + i <= 7 && col - i >= 0) {
    const square = state.board[row + i][col - i] as Square;

    if (cb1) if (cb1(square, state, true)) break;

    if (checker && cb2) {
      const result = cb2(square, state, checker, target);

      if (result) return true;
      if (result === false) break;
    }

    i++;
  }

  i = 1;
  // Top Left
  while (row - i >= 0 && col - i >= 0) {
    const square = state.board[row - i][col - i] as Square;

    if (cb1) if (cb1(square, state, true)) break;

    if (checker && cb2) {
      const result = cb2(square, state, checker, target);

      if (result) return true;
      if (result === false) break;
    }

    i++;
  }
};

export const rookMoves: ComplexPieces = (state, target, cb1, cb2, checker) => {
  const { row, col } = target;
  let i: number = 1;

  // Forward movement
  while (row - i >= 0) {
    const square = state.board[row - i][col];

    if (cb1) if (cb1(square, state, true)) break;

    if (checker && cb2) {
      const result = cb2(square, state, checker, target);

      if (result) return true;
      if (result === false) break;
    }

    i++;
  }

  i = 1;
  // Backward movement
  while (row + i <= 7) {
    const square = state.board[row + i][col];

    if (cb1) if (cb1(square, state, true)) break;

    if (checker && cb2) {
      const result = cb2(square, state, checker, target);

      if (result) return true;
      if (result === false) break;
    }

    i++;
  }

  i = 1;
  // Right movement
  while (col + i <= 7) {
    const square = state.board[row][col + i];

    if (cb1) if (cb1(square, state, true)) break;

    if (checker && cb2) {
      const result = cb2(square, state, checker, target);

      if (result) return true;
      if (result === false) break;
    }

    i++;
  }

  // Left movement
  i = 1;
  while (col - i >= 0) {
    const square = state.board[row][col - i];

    if (cb1) if (cb1(square, state, true)) break;

    if (checker && cb2) {
      const result = cb2(square, state, checker, target);

      if (result) return true;
      if (result === false) break;
    }

    i++;
  }
};

export const kingMoves: SimplePieces = (state, target) => {
  const { row, col } = target;

  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      // if (i === row && j === col) break;
      if (i > 7 || i < 0) continue;
      if (j > 7 || j < 0) continue;

      const square = state.board[i][j];

      validRules(square, state);
    }
  }

  const castle = (row: number) => {
    let i: number = 1;

    while (col - i >= 0) {
      const square = state.board[row][col - i];

      if (!square.empty) {
        if (square.color === state.turn && square.value === "rook") {
          square.valid = true;
        } else break;
      }
      i++;
    }

    i = 1;

    while (col + i <= 7) {
      const square = state.board[row][col + i];

      if (!square.empty) {
        if (square.color === state.turn && square.value === "rook") {
          square.valid = true;
        } else break;
      }
      i++;
    }
  };

  if (state.turn === "w" && row === 7) castle(7);
  if (state.turn === "b" && row === 0) castle(0);
};

export const knightMoves: SimplePieces = (state, target) => {
  const { row, col } = target;
  const firstRow = [row + 1, row - 1];
  const secondRow = [row + 2, row - 2];

  const firstCol = [col + 1, col - 1];
  const secondCol = [col + 2, col - 2];

  const validKnights = (
    firstRow: number[],
    secondCol: number[],
    cb1?: MoveCallBack
  ): void | boolean => {
    const firstLoop = firstRow.map((knightRow) => {
      if (knightRow > 7) return;
      if (knightRow < 0) return;

      const secondLoop = secondCol.map((knightCol) => {
        if (knightCol > 7) return;
        if (knightCol < 0) return;

        const square = state.board[knightRow][knightCol];

        if (cb1) cb1(square, state);
        else {
          if (square.color !== target.color && square.value === "knight") {
            return true;
          }
        }
      });

      if (secondLoop[0] || secondLoop[1]) {
        return true;
      }
    });
    if (firstLoop[0] || firstLoop[1]) {
      return true;
    }
  };

  if (target.value === "king") {
    if (
      validKnights(firstRow, secondCol) ||
      validKnights(secondRow, firstCol)
    ) {
      state.blackCheck = true;
    } else state.blackCheck = false;
  } else {
    validKnights(firstRow, secondCol, validRules) ||
      validKnights(secondRow, firstCol, validRules);
  }
};

export const pawnMoves: SimplePieces = (state, target) => {
  const { row, col } = target;

  let firstSquare: Square;
  let secondSquare: Square | undefined;

  let nextRow: Square[] = [];

  if (target.color === "w") {
    firstSquare = state.board[row - 1][col];

    if (row === 6) secondSquare = state.board[row - 2][col];

    nextRow = state.board[row - 1];
  } else {
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

  if (!firstSquare?.empty) return;
  firstSquare.valid = true;

  if (!secondSquare) return;
  if (!secondSquare?.empty) return;
  secondSquare.valid = true;
};
