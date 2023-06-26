import React from "react";
import GameLayout from "layouts/GameLayout";
import GameStore from "utils/GameStore";
import Dictionary from "utils/Dictionary";
import { isDevelopment } from "utils/Helpers";
import { useNavigate } from "react-router-dom";

let timerID;

window.timers = 0;

let settings = {};

const initScore = {
  right: 0,
  wrong: 0,
  skipped: 0,
  currentCard: 1,
};

const initGameState = {
  isGameStarted: false,
  isPaused: false,
  isMenuOpened: false,
  isRestartDialogOpened: false,
};

let time = 0;

let loadedDicts;

function GameContainer({ isFreePlay }) {
  const navigate = useNavigate();

  const [timeDisplay, setTimeDisplay] = React.useState(
    settings.gameMode ? settings.timeLimit : 0
  );
  const [isDictLoaded, setIsDictLoaded] = React.useState(false);
  const [score, setScore] = React.useState(initScore);
  const [cardsQueue, setCardsQueue] = React.useState([]);
  const [gameState, setGameState] = React.useState({
    isFreePlay,
    ...initGameState,
  });

  const timeDisplayRef = React.useRef(timeDisplay);
  timeDisplayRef.current = timeDisplay;

  React.useEffect(() => {
    isDevelopment() && console.log("--- CDM ---");
    time = 0;
    (async function fetchData() {
      settings = GameStore.loadSettings();
      loadedDicts = await loadDicts(GameStore.loadDicts());
      setIsDictLoaded(true);
      resetCards();
      if (gameState.isFreePlay) {
        setPause(false);
      }
    })();
    return () => {
      isDevelopment() && console.log("--- CWU ---");
      window.clearInterval(timerID);
    };
  }, []);

  React.useEffect(() => {
    if (cardsQueue?.length === 0 && gameState.isGameStarted) {
      if (gameState.isFreePlay) resetCards(true);
      else roundEnd();
    }
  }, [cardsQueue.length]);

  React.useEffect(() => {
    if (settings.gameMode && time === settings.timeLimit + 1) roundEnd();
  }, [time]);

  function resetCards(keepScore = false) {
    setGameState({
      isFreePlay,
      ...initGameState,
    });

    if (!keepScore) {
      setScore(initScore);
      setTimeDisplay(settings.gameMode ? settings.timeLimit : 0);
      time = 0;
    }

    let cards = [...loadedDicts].sort(() => Math.random() - 0.5);
    if (!isFreePlay) {
      if (settings.gameMode === false) cards = cards.splice(0, settings.cardSet);
      cards.push({ isCardBack: true });
    }
    setCardsQueue(cards);
    console.log("CARDS", cards);
    isDevelopment() && console.log("ON RESET: ", gameState, score);
  }

  const onRestart = () => {
    window.clearInterval(timerID);
    resetCards();
  };

  function roundEnd() {
    const roundStat = {
      ...settings,
      ...score,
      time,
      timeDisplay: timeDisplayRef.current,
      timeStamp: Date.now(),
    };

    isDevelopment() && console.log("Round!", roundStat);

    window.clearInterval(timerID);
    GameStore.pushStats(roundStat);
    navToRoundEnd();
  }

  const tick = () => {
    isDevelopment() && console.log("Tick " + time);

    time++;
    setTimeDisplay(settings.gameMode ? settings.timeLimit - time : time);
  };

  function setPause(paused) {
    window.clearInterval(timerID);
    if (paused === false) {
      window.timers++;
      timerID = window.setInterval(tick, 1000);
      isDevelopment() && console.log("TimerID:", timerID);
    }

    setGameState((prev) => ({ ...prev, isPaused: paused }));

    isDevelopment() && console.log(`PAUSED ${gameState.isPaused}`);
  }

  const onStart = () => {
    let newCardsQueue = cardsQueue;
    newCardsQueue.pop();

    setCardsQueue(newCardsQueue);
    setGameState({ ...gameState, isGameStarted: true });
    setPause(false);
  };

  const onHit = () => {
    isDevelopment() && console.log("Hit");
    setScore((prev) => {
      let newCardsQueue = cardsQueue;
      newCardsQueue.pop();
      setCardsQueue(newCardsQueue);

      return {
        ...prev,
        right: prev.right + 1,
        currentCard: prev.currentCard + 1,
      };
    });
  };

  const onBuzz = () => {
    isDevelopment() && console.log("Buzz");
    setScore((prev) => {
      let newCardsQueue = cardsQueue;
      newCardsQueue.pop();
      setCardsQueue(newCardsQueue);

      return {
        ...prev,
        wrong: prev.wrong + 1,
        currentCard: prev.currentCard + 1,
      };
    });
  };

  const onSkip = () => {
    let newCardsQueue = cardsQueue;

    newCardsQueue.unshift(newCardsQueue.pop());
    setCardsQueue(newCardsQueue);

    if (cardsQueue.length > 1) {
      setScore((prev) => {
        return {
          ...prev,
          skipped: prev.skipped + 1,
        };
      });
    }
  };

  const onModalWindowOpened = (opened, kind) => () => {
    const newGameState = { ...gameState };
    setPause(opened);
    switch (kind) {
      case "menu":
        newGameState.isMenuOpened = opened;
        break;

      case "restart":
        newGameState.isRestartDialogOpened = opened;
        break;

      default:
        break;
    }

    setGameState(newGameState);
  };

  function navToRoundEnd() {
    navigate("/RoundEnd");
  }

  async function loadDicts(filter) {
    try {
      const dictList = await Dictionary.list();

      try {
        const dicts = await Promise.all(
          Object.keys(dictList).reduce(
            (prev, dictId) => [...prev, Dictionary.get(dictId)],
            []
          )
        );

        let dictFallback = !Object.keys(filter).reduce(
          (prev, cur) => prev || filter[cur],
          false
        );

        const result = Object.keys(dictList).reduce(
          (prev, dictId, index) =>
            filter[dictId] || dictFallback
              ? [...prev, ...dicts[index]]
              : [...prev],
          []
        );

        return result;
      } catch {
        isDevelopment() && console.error("Error loading dictionaries");
      }
    } catch {
      isDevelopment() && console.error("Error loading list");
    }
  }

  return (
    <GameLayout
      onHit={onHit}
      onBuzz={onBuzz}
      onSkip={onSkip}
      onStart={onStart}
      headerAction={{
        menu: {
          onClick: onModalWindowOpened(true, "menu"),
        },
        restart: {
          onClick: onModalWindowOpened(true, "restart"),
        },
        back: {
          link: "/Menu",
        },
      }}
      onMenuActions={{
        overlay: {
          onClose: onModalWindowOpened(false, "menu"),
        },
        restart: {
          onClick: onRestart,
        },
        goToMenu: {
          link: "/Menu",
        },
        resume: {
          onClick: onModalWindowOpened(false, "menu"),
        },
      }}
      onRestartDialogActions={{
        overlay: {
          onClose: onModalWindowOpened(false, "restart"),
        },
        restart: {
          onClick: onRestart,
        },
        resume: {
          onClick: onModalWindowOpened(false, "restart"),
        },
      }}
      settings={settings}
      score={{ ...score, time: time, timeDisplay: timeDisplay }}
      gameState={gameState}
      cardsQueue={cardsQueue}
      isDictLoaded={isDictLoaded}
    />
  );
}

export default GameContainer;
