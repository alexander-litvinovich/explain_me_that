import React from "react";
import Header from "components/Header";
import RoundButton from "components/RoundButton";
import Button from "components/Button";
import Icon from "components/Icon";
import LastRoundWidget from "components/LastRoundWidget";
import StatsTable from "components/StatsTable";
import Particles from "components/Particles";

import "./StatisticsLayout.css";

const renderFallback = () => (
  <div className="StatisticsLayout-Fallback">
    <h2>There is nothing to show</h2>
    <div>
      Play couple of games, have fun, then return and we will show you the
      Statistics.
    </div>
  </div>
);

const renderStatsFallback = () => (
  <div className="StatisticsLayout-StatsTableFallback">
    Keep trying and there will be your statistics.
  </div>
);

const StatisticsLayout = ({
  roundEnd,
  rounds,
  lastRound,
  nextRoundButton,
  returnToMenu,
  goToStats,
  clearStats,
}) => {
  return (
    <div className="StatisticsLayout">
      <Header
        fixed
        leftButton={
          <RoundButton {...returnToMenu} title="Back to menu" small ghost>
            {roundEnd ? <Icon name="Menu" /> : <Icon name="Back" />}
          </RoundButton>
        }
      >
        <h1>{roundEnd ? "Round!" : "Statistics"}</h1>
      </Header>

      {!lastRound ? (
        renderFallback()
      ) : (
        <div className="StatisticsLayout-pane">
          {lastRound.bestScore && <Particles />}
          <LastRoundWidget
            stats={lastRound}
            style={roundEnd ? "round" : "stats"}
            button={
              roundEnd && (
                <RoundButton
                  color="blue"
                  title="Next round"
                  {...nextRoundButton}
                >
                  <Icon name="Restart" />
                </RoundButton>
              )
            }
          />
          {rounds.length > 0 ? (
            <StatsTable stats={rounds} faded={roundEnd} />
          ) : (
            renderStatsFallback()
          )}
          {rounds.length > 0 && !roundEnd && (
            <div className="StatisticsLayout-clearButton">
              <RoundButton
                {...clearStats}
                title="Clear game statistics"
                color="red"
                small
              >
                <Icon name="Cross" />
              </RoundButton>
            </div>
          )}
        </div>
      )}
      {rounds.length > 0 && roundEnd && (
        <Button title="Statistics" color="black" {...goToStats} />
      )}
    </div>
  );
};

export default StatisticsLayout;
