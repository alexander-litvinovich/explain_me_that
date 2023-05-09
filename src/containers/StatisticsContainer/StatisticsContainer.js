import React from "react";
import GameStore from "utils/GameStore.js";

import StatisticsLayout from "layouts/StatisticsLayout";

const NUMBER_OF_STAT_ROWS_TO_SHOW = 5;

const StatisticsContainer = ({ roundEnd }) => {
  const [isStatsLoaded, setIsStatsLoaded] = React.useState(false);
  const [rounds, setRounds] = React.useState([]);
  const [lastRound, setLastRound] = React.useState(false);

  const clearStats = () => {
    GameStore.clearStats();
    setRounds([]);
    setLastRound(false);
  };

  React.useEffect(() => {
    const rounds = GameStore.loadStats().slice(0, NUMBER_OF_STAT_ROWS_TO_SHOW);

    setLastRound(rounds.shift());
    setRounds(rounds);
    setIsStatsLoaded(true);
  }, []);

  if (isStatsLoaded)
    return (
      <StatisticsLayout
        roundEnd={roundEnd}
        lastRound={lastRound}
        rounds={rounds}
        clearStats={{ onClick: clearStats }}
        returnToMenu={{ link: "/Menu" }}
        nextRoundButton={{ link: "/Game" }}
        goToStats={{ link: "/Statistics" }}
      />
    );
  else return <>Loading stats</>;
};

export default StatisticsContainer;
