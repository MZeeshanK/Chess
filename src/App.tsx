import { useState } from "react";
import Menu from "./components/Menu";
import Board from "./components/Board";
import KillBoard from "./components/KillBoard";
import { useAppDispatch, useAppSelector } from "./store/store";
// import { resetGame } from "./store/square";

const App = () => {
  const dispatch = useAppDispatch();
  const { blackKill, whiteKill } = useAppSelector((state) => state.square);
  // const [toggle, setToggle] = useState(false);
  const [killToggle, setKillToggle] = useState(false);

  return (
    <main className="h-screen lg:w-screen max-h-screen max-w-screen p-3 py-6 lg:py-6 lg:px-10 flex flex-col-reverse lg:flex-row items-center justify-center gap-y-4 lg:space-y-0 lg:space-x-10">
      <Menu killToggle={killToggle} setKillToggle={setKillToggle} />
      <section className="brown-gradient relative w-full sm:w-[75%] lg:w-fit h-fit lg:h-full rounded-xl p-4 lg:p-10 flex items-center justify-start space-x-10">
        <div className="relative lg:h-full w-full lg:w-fit aspect-square brown-gradient">
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
