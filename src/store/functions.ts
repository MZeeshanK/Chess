import { Square } from "../types";
import { State } from "./square";

export const validRules = (
  square: Square,
  state: State,
  boundary?: boolean
): void | boolean => {
  if (!square.empty) {
    if (square.color !== state.turn) square.kill = true;
    if (boundary) return true;
  } else square.valid = true;
};
