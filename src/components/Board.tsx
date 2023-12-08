import { useAppSelector } from "../store/store";
import Piece from "./Piece";

const Board = () => {
  const squares = useAppSelector((state) => state.square);

  return (
    <div className="grid grid-cols-8 grid-rows-8">
      {squares.map((square) => (
        <Piece
          key={square.pos}
          value={square.value || ""}
          pos={square.pos}
          color={square.color || ""}
          current={square.current}
          valid={square.valid}
          empty={square.empty}
        />
      ))}
    </div>
  );
};

export default Board;
