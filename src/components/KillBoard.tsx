import { Piece } from "../types";

type Props = {
  killArray: Piece[];
  color: "white" | "black";
};

const KillBoard = ({ killArray, color }: Props) => {
  return (
    <div
      className="p-2 h-full w-full flex items-center justify-center rounded-xl"
      style={{
        background: "linear-gradient(135deg, #5e2b15 0%, #291208 100%)",
      }}
    >
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
    </div>
  );
};

export default KillBoard;
