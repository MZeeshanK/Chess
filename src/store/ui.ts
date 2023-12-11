import { Square } from "../types";

const initialState: Square[][] = [];

for (let i: number = 0; i <= 7; i++) {
  const arr: Square[] = [];

  switch (i) {
    case 0:
    case 7:
      for (let j: number = 0; j <= 7; j++) {
        switch (j) {
          case 0:
          case 7:
            arr.push({
              row: i,
              col: j,
              value: "rook",
              color: i === 0 ? "b" : "w",
              current: false,
              valid: false,
              empty: false,
              kill: false,
            });
            break;

          case 1:
          case 6:
            arr.push({
              row: i,
              col: j,
              value: "knight",
              color: i === 0 ? "b" : "w",
              current: false,
              valid: false,
              empty: false,
              kill: false,
            });
            break;

          case 2:
          case 5:
            arr.push({
              row: i,
              col: j,
              value: "bishop",
              color: i === 0 ? "b" : "w",
              current: false,
              valid: false,
              empty: false,
              kill: false,
            });
            break;

          case 3:
            arr.push({
              row: i,
              col: j,
              value: "queen",
              color: i === 0 ? "b" : "w",
              current: false,
              valid: false,
              empty: false,
              kill: false,
            });
            break;

          case 4:
            arr.push({
              row: i,
              col: j,
              value: "king",
              color: i === 0 ? "b" : "w",
              current: false,
              valid: false,
              empty: false,
              kill: false,
            });
            break;
        }
      }
      break;
    case 1:
    case 6:
      for (let j: number = 0; j <= 7; j++) {
        arr.push({
          row: i,
          col: j,
          value: "pawn",
          color: i === 1 ? "b" : "w",
          current: false,
          valid: false,
          empty: false,
          kill: false,
        });
      }
      break;
    case 2:
    case 3:
    case 4:
    case 5:
      for (let j: number = 0; j <= 7; j++) {
        arr.push({
          row: i,
          col: j,
          current: false,
          valid: false,
          empty: true,
          kill: false,
        });
      }
      break;
  }
  initialState.push(arr);
}

export default initialState;
