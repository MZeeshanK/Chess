import React, { useState } from "react";
import Menu from "./components/Menu";
import Board from "./components/Board";
import KillBoard from "./components/KillBoard";
import { useAppDispatch, useAppSelector } from "./store/store";
import { resetGame } from "./store/square";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { blackKill, whiteKill } = useAppSelector((state) => state.square);
  const [toggle, setToggle] = useState(false);

  return (
    <main className="h-screen max-h-screen py-6 px-10 flex items-center justify-between">
      {/* Aside Menu */}
      <Menu setToggle={setToggle} />
      <div className="w-full" />
      {/* Main Board */}
      <section className=" outer-board">
        <div className="relative inner-board">
          {toggle && (
            <div
              className={`absolute w-full flex flex-col items-center justify-center z-20 inset-0 bg-black/80 ${
                toggle ? "scale" : ""
              } `}
            >
              <h1 className="text-center font-black text-3xl text-white mb-10">
                Are You Sure you want to quit the game?
              </h1>
              <div className="flex w-full items-center justify-center space-x-10">
                <button className="btn" onClick={() => setToggle(false)}>
                  No
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    dispatch(resetGame());
                    setToggle(false);
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          )}
          <Board />
        </div>
      </section>
      {/* Kill Board */}
      <section className="w-full ml-32 flex space-y-2 h-full m-5 flex-col items-center justify-around">
        <KillBoard killArray={blackKill} color="black" />
        <KillBoard killArray={whiteKill} color="white" />
      </section>
    </main>
  );
};

export default App;
