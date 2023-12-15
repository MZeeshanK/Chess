import { Piece } from "../types";

type Props = {
  killArray: Piece[];
  color: "white" | "black";
};

const KillBoard = ({ killArray, color }: Props) => {
  return (
    <div
      className="grid h-full w-full rounded-xl grid-cols-4 grid-rows-4"
      style={{
        backgroundImage: `url("/src/assets/${color}-board.png")`,
        backgroundSize: "cover",
      }}
    >
      {killArray.map((square, index) => (
        <div className="h-full" key={index}>
          <img
            src={`/src/assets/${square}-${color === "white" ? "b" : "w"}.png`}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default KillBoard;
