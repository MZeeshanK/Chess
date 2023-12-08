import { useAppDispatch } from "../store/store";
import { movePiece, toggleCurrent } from "../store/square";

type Props = {
  key: number;
  value: "king" | "queen" | "bishop" | "rook" | "knight" | "pawn" | "";
  color: "w" | "b" | "";
  pos: number;
  current: boolean;
  valid: boolean;
  empty: boolean;
};

const Piece = ({ value, pos, color, current, valid, empty }: Props) => {
  const row: number = Math.floor(pos / 10);
  const col: number = pos % 10;

  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => {
        if (valid) dispatch(movePiece(pos));
        else dispatch(toggleCurrent(pos));
      }}
      style={{
        background:
          (row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0)
            ? "url(/src/assets/white-square.png)"
            : "url(/src/assets/black-square.png)",
      }}
      className={`h-[100%] aspect-square flex items-center justify-center relative ${
        current ? "overlay" : ""
      } ${valid ? "valid" : ""}`}
    >
      {!empty && (
        <img
          className="absolute z-10"
          src={`/src/assets/${value}-${color}.png`}
          alt=""
        />
      )}
    </div>
  );
};

export default Piece;
