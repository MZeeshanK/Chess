import { useAppDispatch, useAppSelector } from "../store/store";
import { movePiece, toggleCurrent } from "../store/square";
import { Square } from "../types";

type Props = {
  square: Square;
};

const Piece = ({ square }: Props) => {
  const dispatch = useAppDispatch();

  const { turn, blackCheck, whiteCheck } = useAppSelector(
    (state) => state.square
  );

  const { row, col, value, color, current, valid, kill, empty } = square;

  const blackCheckCondition = blackCheck && color === "b" && value === "king";
  const whiteCheckCondition = whiteCheck && color === "w" && value === "king";

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
      ${
        row === 0 && col === 0
          ? "rounded-tl-xl"
          : row === 0 && col === 7
          ? "rounded-tr-xl"
          : row === 7 && col === 0
          ? "rounded-bl-xl"
          : row === 7 && col === 7
          ? "rounded-br-xl"
          : ""
      }
      `}
    >
      {/* Normal Square */}
      {!empty && !blackCheckCondition && !whiteCheckCondition ? (
        <img
          className="absolute z-20"
          src={`/src/assets/${value}-${color}.png`}
          alt="loading"
        />
      ) : blackCheckCondition && !empty ? (
        // Black check King
        <img
          className="absolute z-20"
          src={`/src/assets/black-king-check.png`}
          alt="loading"
        />
      ) : whiteCheckCondition && !empty ? (
        // white check king
        <img
          className="absolute z-20"
          src={`/src/assets/white-king-check.png`}
          alt="loading"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Piece;
