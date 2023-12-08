import React from "react";
import Board from "./components/Board";

const App: React.FC = () => {
  return (
    <main className="flex h-screen max-h-screen  items-center justify-center">
      <section className="outer-board">
        <section className="inner-board">
          <Board />
        </section>
      </section>
    </main>
  );
};

export default App;
