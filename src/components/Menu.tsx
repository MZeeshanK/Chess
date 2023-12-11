import { undoMove } from "../store/square";
import { useAppDispatch, useAppSelector } from "../store/store";

type Props = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = ({ setToggle }: Props) => {
  const dispatch = useAppDispatch();
  const { turn } = useAppSelector((state) => state.square);

  return (
    <aside
      className="h-full w-1/3 flex flex-col items-center justify-between px-5 rounded-lg py-10 -ml-5"
      style={{
        background: "linear-gradient(135deg, #5e2b15 0%, #291208 100%)",
      }}
    >
      {/* Turn indicator */}
      <div className="flex w-full flex-col items-center">
        <img
          src={`/src/assets/pawn-${turn}.png`}
          className="w-20 aspect-square"
          alt=""
        />
        <p className="font-bold text-white uppercase">turn</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-10">
        <button onClick={() => dispatch(undoMove())}>
          <img src="/src/assets/undo.png" className="w-12" alt="" />
        </button>
        <button onClick={() => setToggle(true)}>
          <img src="/src/assets/close.png" className="w-12" alt="" />
        </button>
      </div>
    </aside>
  );
};

export default Menu;
