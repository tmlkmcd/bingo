import * as React from "react";
import clsx from "clsx";

import "./App.css";
import { Tick } from "./icons/Tick.tsx";
import { Cross } from "./icons/Cross.tsx";
import { clearPersist, loadPersist, savePersist } from "./storage.ts";

const cardItems: string[] = [
  "We go to De Garre",
  "Tommy shows his age and/or can't hear something",
  "Felix alludes to the temperature",
  "Kieran declares a non-committal stance on something",
  "Someone goes for a stew",
  "BC group has a TTH moment",
  "Lydia is surprised she can eat something",
  "Reference to the film In Bruges",
  "Reference to the game Blue Prince",
  "Tommy finishes his drink before everyone else AND double parks",
  `Sarah says "when I've been here before" with reference to family`,
  "Kieran mentions a non-SLJO friend",
  "Felix quizzes the group",
  "Christmas shopping takes place",
  "Felix sulks or grumbles",
  "Sarah tries to galvanise the group",
  "Kieran slurs his words",
  "Sarah says she's sorry",
  "Lydia complains about her hair",
  "Pop a squazz",
  "Tommy makes reference to being unemployed",
  "Someone mentions their step count",
  "Lydia scared of being offered gluten",
  "Someone references the BC band",
  "Brexit is mentioned, positively or negatively",
];

function shuffle(dod: boolean = false) {
  if (!dod) return cardItems;
  return cardItems.slice().sort(() => Math.random() - 0.5);
}

const gridSize = 5;
const numGridItems = Math.pow(gridSize, 2);

function App() {
  const [persisted] = React.useState(() => loadPersist());

  const [items] = React.useState<string[]>(() => {
    return persisted?.items ?? shuffle(true);
  });
  const [gameState, setGameState] = React.useState<boolean[]>(() => {
    return (
      persisted?.gameState ?? [...new Array(numGridItems)].map(() => false)
    );
  });

  React.useEffect(() => {
    savePersist({ items, gameState });
  });

  const toggle = (n: number) => {
    if (n < 0 || n >= numGridItems) return;

    setGameState((currentGameState) => {
      return currentGameState.map((a, _n) => {
        return n === _n ? !a : a;
      });
    });
  };

  return (
    <>
      <main>
        <h1>BC plays BINGO!</h1>
        <div className="grid">
          {[...new Array(numGridItems)].map((_n, i) => {
            return (
              <button
                className={clsx("bingobutton")}
                onClick={() => toggle(i)}
                key={items[i]}
              >
                <span>{items[i]}</span>
                {gameState[i] ? <Tick /> : <Cross />}
              </button>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;
