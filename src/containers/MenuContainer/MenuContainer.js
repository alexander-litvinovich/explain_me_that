import React from "react";
import MenuLayout from "layouts/MenuLayout";
import GameStore from "utils/GameStore.js";
import { secToTimeString } from "utils/Helpers.js";

const MenuContainer = () => {
  const settings = GameStore.loadSettings();
  const lastRound = GameStore.loadStats().slice(0, 1)[0] || null;
  const gameModeLabels = {
    true: "Time Attack",
    false: "Card Set",
  };

  const timeLimitLabels = {
    3: "3 sec",
    30: "Half of minute",
    60: "1 minute",
    180: "3 minutes",
    300: "5 minutes",
  };

  let gameSubTitle = `${gameModeLabels[settings.gameMode]}, ${settings.gameMode
    ? timeLimitLabels[settings.timeLimit]
    : settings.cardSet + " cards"
    }`;

  let statsSubTitle = !!lastRound
    ? `${gameModeLabels[lastRound.gameMode]}, ${lastRound.right
    } hits for ${secToTimeString(lastRound.time)}`
    : "";

  GameStore.firstRun();

  return (
    <MenuLayout
      game={{ link: "/Game", subTitle: gameSubTitle }}
      freePlay={{ link: "/Game/Free" }}
      statistics={{ link: "/Statistics", subTitle: statsSubTitle }}
      settings={{ link: "/Settings" }}
      rules={{ link: "/Rules" }}
    />
  );
};

export default MenuContainer;
