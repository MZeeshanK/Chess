import { undoMove } from "../store/square";
import { useAppDispatch, useAppSelector } from "../store/store";

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  killToggle: boolean;
  setKillToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = ({ toggle, setToggle, killToggle, setKillToggle }: Props) => {
  const dispatch = useAppDispatch();
  const { turn } = useAppSelector((state) => state.square);

  return (
    <aside
      className="lg:h-full w-full sm:w-[75%]  lg:w-fit flex lg:flex-col items-center justify-between px-5 rounded-lg lg:py-10 lg:pb-16"
      style={{
        background: "linear-gradient(135deg, #5e2b15 0%, #291208 100%)",
      }}
    >
      {/* Turn indicator */}
      <div className="flex lg:w-full lg:flex-col items-center">
        <div className="flex flex-col items-center justify-center lg:space-x-0">
          <img
            src={`/src/assets/pawn-${turn}.png`}
            className="w-10 lg:w-20 aspect-square mb-1 lg:mb-2 "
            alt=""
          />
          <p className="font-bold text-white uppercase text-sm lg:text-3xl">
            turn
          </p>
        </div>
      </div>

      <div className="flex lg:flex-col items-center justify-center space-x-4 md:space-x-8 lg:space-x-0 lg:space-y-12">
        <button
          className="text-3xl lg:text-7xl h-full lg:h-fit hidden sm:flex xl:hidden items-center justify-center text-white font-bold"
          onClick={() => {
            setKillToggle(!killToggle);

            setTimeout(() => {
              setKillToggle(false);
            }, 1200);
          }}
        >
          <p>H</p>
        </button>
        <button onClick={() => dispatch(undoMove())}>
          <img
            src="/src/assets/undo.png"
            className="w-5 md:w-8 lg:w-12"
            alt=""
          />
        </button>
        <button onClick={() => setToggle(!toggle)}>
          <img
            src="/src/assets/close.png"
            className="w-5 md:w-8 lg:w-12"
            alt=""
          />
        </button>
      </div>
    </aside>
  );
};

export default Menu;
