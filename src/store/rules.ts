import { CheckCallBack, ComplexPieces, MoveCallBack, Square } from "../types";

export const validRules: MoveCallBack = (square, state, boundary) => {
  if (!square.empty) {
    if (square.color !== state.turn) square.kill = true;
    if (boundary) return true;
  } else square.valid = true;
};

export const validChecks: CheckCallBack = (square, target, checker) => {
  if (!square.empty) {
    if (square.color !== target.color && square.value === checker) return true;
    else return false;
  }
};

// Logic for the movement of bishop
export const bishopMoves: ComplexPieces = (state, target, checker) => {
  const { row, col } = target;
  let i = 1;

  // Top Right
  while (row - i >= 0 && col + i <= 7) {
    const square = state.board[row - i][col + i] as Square;

    if (!checker) {
      if (validRules(square, state, true)) break;
    } else {
      const valid = validChecks(square, target, checker);
      if (valid) return true;
      else if (valid === false) break;
    }
    i++;
  }

  i = 1;
  // Bottom Right
  while (row + i <= 7 && col + i <= 7) {
    const square = state.board[row + i][col + i] as Square;

    if (!checker) {
      if (validRules(square, state, true)) break;
    } else {
      const valid = validChecks(square, target, checker);
      if (valid) return true;
      else if (valid === false) break;
    }

    i++;
  }

  i = 1;
  // Bottom Left
  while (row + i <= 7 && col - i >= 0) {
    const square = state.board[row + i][col - i] as Square;

    if (!checker) {
      if (validRules(square, state, true)) break;
    } else {
      const valid = validChecks(square, target, checker);
      if (valid) return true;
      else if (valid === false) break;
    }

    i++;
  }

  i = 1;
  // Top Left
  while (row - i >= 0 && col - i >= 0) {
    const square = state.board[row - i][col - i] as Square;

    if (!checker) {
      if (validRules(square, state, true)) break;
    } else {
      const valid = validChecks(square, target, checker);
      if (valid) return true;
      else if (valid === false) break;
    }

    i++;
  }
  return false;
};

// Logic for the movement of rook
export const rookMoves: ComplexPieces = (state, target, checker) => {
  const { row, col } = target;
  let i: number = 1;

  // Forward movement
  while (row - i >= 0) {
    const square = state.board[row - i][col];

    if (!checker) {
      if (validRules(square, state, true)) break;
    } else {
      const valid = validChecks(square, target, checker);
      if (valid) return true;
      else if (valid === false) break;
    }

    i++;
  }

  i = 1;
  // Backward movement
  while (row + i <= 7) {
    const square = state.board[row + i][col];

    if (!checker) {
      if (validRules(square, state, true)) break;
    } else {
      const valid = validChecks(square, target, checker);
      if (valid) return true;
      else if (valid === false) break;
    }

    i++;
  }

  i = 1;
  // Right movement
  while (col + i <= 7) {
    const square = state.board[row][col + i];

    if (!checker) {
      if (validRules(square, state, true)) break;
    } else {
      const valid = validChecks(square, target, checker);
      if (valid) return true;
      else if (valid === false) break;
    }

    i++;
  }

  // Left movement
  i = 1;
  while (col - i >= 0) {
    const square = state.board[row][col - i];

    if (!checker) {
      if (validRules(square, state, true)) break;
    } else {
      const valid = validChecks(square, target, checker);
      if (valid) return true;
      else if (valid === false) break;
    }

    i++;
  }
  return false;
};

// Logic for the movement of king
export const kingMoves: ComplexPieces = (state, target) => {
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

// Logic for the movement of knight
export const knightMoves: ComplexPieces = (state, target) => {
  const { row, col } = target;
  const firstRow = [row + 1, row - 1];
  const secondRow = [row + 2, row - 2];

  const firstCol = [col + 1, col - 1];
  const secondCol = [col + 2, col - 2];

  const validKnights = (
    firstRow: number[],
    secondCol: number[]
  ): void | boolean => {
    const first = firstRow.map((knightRow) => {
      if (knightRow > 7) return;
      if (knightRow < 0) return;

      const second = secondCol.map((knightCol) => {
        if (knightCol > 7) return;
        if (knightCol < 0) return;

        const square = state.board[knightRow][knightCol];

        if (target.value === "king") {
          if (square.value === "knight" && square.color !== target.color)
            return true;
        } else {
          validRules(square, state);
        }
      });

      if (second[0] || second[1]) return true;
    });

    if (first[0] || first[0]) return true;
  };

  if (target.value === "king") {
    if (validKnights(firstRow, secondCol) || validKnights(secondRow, firstCol))
      return true;
  }

  validKnights(firstRow, secondCol);
  validKnights(secondRow, firstCol);
};

// Logic for the movement of pawn
export const pawnMoves: ComplexPieces = (state, target) => {
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

export const kingCheck: ComplexPieces = (state, target) => {
  const { row, col } = target;

  const arr1 = [row, row + 1, row - 1];
  const arr2 = [col, col + 1, col - 1];

  const first = arr1.map((rows) => {
    if (rows < 0 || rows > 7) return;

    const second = arr2.map((cols) => {
      if (rows === cols) return;
      if (cols < 0 || cols > 7) return;

      const square = state.board[rows][cols];

      if (
        !square.empty &&
        square.value === "king" &&
        square.color !== target.color
      ) {
        return true;
      }
    });

    for (let i = 0; i < second.length; i++) {
      if (second[i]) return true;
    }
  });

  for (let i = 0; i < first.length; i++) {
    if (first[i]) return true;
  }
};

export const pawnCheck: ComplexPieces = (state, target) => {
  const { row, col } = target;

  let firstSquare: Square;
  let secondSquare: Square;

  if (target.color === "w") {
    if (row === 0) return;

    firstSquare = state.board[row - 1][col + 1];
    secondSquare = state.board[row - 1][col - 1];

    if (
      (firstSquare.color === "b" && firstSquare.value === "pawn") ||
      (secondSquare.color === "b" && secondSquare.value === "pawn")
    )
      return true;
  } else {
    if (row === 7) return;

    firstSquare = state.board[row + 1][col + 1];
    secondSquare = state.board[row + 1][col - 1];

    if (
      (firstSquare.color === "w" && firstSquare.value === "pawn") ||
      (secondSquare.color === "w" && secondSquare.value === "pawn")
    )
      return true;
  }
};
