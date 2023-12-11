import { useAppDispatch, useAppSelector } from "../store/store";
import { movePiece, toggleCurrent } from "../store/square";
import { Square } from "../types";

type Props = {
  square: Square;
};

const Piece = ({ square }: Props) => {
  const dispatch = useAppDispatch();

  const { turn } = useAppSelector((state) => state.square);

  const { row, col, value, color, current, valid, kill, empty } = square;

  return (
    <div
      onClick={() => {
        if (valid || kill) dispatch(movePiece({ row, col }));
        else if ((!valid && empty) || color !== turn) return;
        else dispatch(toggleCurrent({ row, col }));
      }}
      style={{
        background:
          (row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0)
            ? "url(/src/assets/white-square.png)"
            : "url(/src/assets/black-square.png)",
      }}
      className={`h-full aspect-square flex items-center justify-center relative ${
        current ? "overlay" : ""
      } ${valid ? "valid" : ""}
      ${kill ? "kill" : ""}
      `}
    >
      {!empty && (
        <img
          className="absolute z-10"
          src={`/src/assets/${value}-${color}.png`}
          alt="loading"
        />
      )}
    </div>
  );
};

export default Piece;
