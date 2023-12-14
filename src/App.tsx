import { useState } from "react";
import Menu from "./components/Menu";
import Board from "./components/Board";
import KillBoard from "./components/KillBoard";
import { useAppDispatch, useAppSelector } from "./store/store";
import { resetGame } from "./store/square";
// import { resetGame } from "./store/square";

const App = () => {
  const dispatch = useAppDispatch();
  const { blackKill, whiteKill } = useAppSelector((state) => state.square);
  const [toggle, setToggle] = useState(false);
  const [killToggle, setKillToggle] = useState(false);

  const quitGame = () => {
    dispatch(resetGame());
    setToggle(false);
  };

  const QuitGame = ({ toggle }: { toggle: boolean }) => {
    return (
      <section
        className={`bg-black/80  absolute inset-0 flex z-50 flex-col space-y-12 items-center justify-center ${
          toggle ? "scale" : "hidden"
        }`}
      >
        <h1 className="text-4xl text-center text-white font-black">
          Are you sure You want to quit the game?
        </h1>
        <div className="w-full flex space-x-10 text-xl text-white font-black items-center justify-center">
          <button
            className="w-1/3 rounded-xl border-4 py-4 border-gray-400"
            onClick={() => setToggle(false)}
            style={{
              background: 'url("/src/assets/black-board.png")',
              backgroundSize: "cover",
            }}
          >
            No
          </button>
          <button
            className="w-1/3 rounded-xl border-4 py-4 border-gray-400 text-black"
            style={{
              background: 'url("/src/assets/white-board.png")',
              backgroundSize: "cover",
            }}
            onClick={quitGame}
          >
            Yes
          </button>
        </div>
      </section>
    );
  };

  return (
    <main className="h-screen lg:w-screen max-h-screen max-w-screen p-3 py-6 lg:py-6 lg:px-10 flex flex-col-reverse lg:flex-row items-center justify-center gap-y-4 lg:space-y-0 lg:space-x-10">
      <Menu
        killToggle={killToggle}
        setKillToggle={setKillToggle}
        toggle={toggle}
        setToggle={setToggle}
      />
      <section className="brown-gradient w-full sm:w-[75%] lg:w-fit h-fit lg:h-full rounded-xl p-4 lg:p-10 flex items-center justify-start space-x-10">
        <div className="lg:h-full w-full relative lg:w-fit aspect-square brown-gradient">
          <QuitGame toggle={toggle} />
          <section
            className="flex sm:hidden items-center justify-center space-x-4 mb-4"
            style={{ aspectRatio: 2 / 1 }}
          >
            <KillBoard killArray={blackKill} color="black" />
            <KillBoard killArray={whiteKill} color="white" />
          </section>
          {killToggle ? (
            <section className="h-full flex flex-col w-full items-center justify-center space-y-10">
              <KillBoard killArray={blackKill} color="black" />
              <KillBoard killArray={whiteKill} color="white" />
            </section>
          ) : (
            <Board />
          )}
        </div>

        <section
          className="h-full hidden xl:flex flex-col items-center justify-center space-y-10"
          style={{ aspectRatio: 1 / 2 }}
        >
          <KillBoard killArray={blackKill} color="black" />
          <KillBoard killArray={whiteKill} color="white" />
        </section>
      </section>
    </main>
  );
};

export default App;
