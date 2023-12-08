export interface Square {
  pos: number;
  value?: "rook" | "knight" | "bishop" | "queen" | "king" | "pawn" | "";
  color?: "w" | "b" | "";
  current: boolean;
  valid: boolean;
  empty: boolean;
}

const initialState: Square[] = [];

for (let i: number = 1; i <= 8; i++) {
  for (let j: number = 1; j <= 8; j++) {
    switch (i) {
      case 1:
      case 8:
        switch (j) {
          case 1:
          case 8:
            initialState.push({
              pos: i * 10 + j,
              value: "rook",
              color: i === 1 ? "b" : "w",
              current: false,
              valid: false,
              empty: false,
            });
            break;
          case 2:
          case 7:
            initialState.push({
              pos: i * 10 + j,
              value: "knight",
              color: i === 1 ? "b" : "w",
              current: false,
              valid: false,
              empty: false,
            });
            break;
          case 3:
          case 6:
            initialState.push({
              pos: i * 10 + j,
              value: "bishop",
              color: i === 1 ? "b" : "w",
              current: false,
              valid: false,
              empty: false,
            });
            break;
          case 4:
            initialState.push({
              pos: i * 10 + j,
              value: "queen",
              color: i === 1 ? "b" : "w",
              current: false,
              valid: false,
              empty: false,
            });
            break;
          case 5:
            initialState.push({
              pos: i * 10 + j,
              value: "king",
              color: i === 1 ? "b" : "w",
              current: false,
              valid: false,
              empty: false,
            });
            break;
          default:
            break;
        }
        break;
      case 2:
      case 7:
        initialState.push({
          pos: i * 10 + j,
          value: "pawn",
          color: i === 2 ? "b" : "w",
          current: false,
          valid: false,
          empty: false,
        });
        break;
      default:
        initialState.push({
          pos: i * 10 + j,
          current: false,
          valid: false,
          empty: true,
        });
    }
  }
}

export default initialState;
