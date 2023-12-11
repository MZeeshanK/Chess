import { useAppSelector } from "../store/store";
import Piece from "./Piece";

const Board = () => {
  const { board: squares } = useAppSelector((state) => state.square);

  return (
    <div className="flex relative h-full items-center justify-center flex-col">
      {squares.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="w-full h-full bg-black flex items-center justify-center"
        >
          {row.map((square, colIndex) => (
            <Piece key={colIndex} square={square} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
