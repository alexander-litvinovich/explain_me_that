import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import SplashContainer from "containers/SplashContainer";
import MenuContainer from "containers/MenuContainer";
import StatisticsContainer from "containers/StatisticsContainer";
import SettingsContainer from "containers/SettingsContainer";
import RulesContainer from "containers/RulesContainer";
import GameContainer from "containers/GameContainer";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<SplashContainer />} />
        <Route
          path="/Statistics"
          element={<StatisticsContainer roundEnd={false} />}
        />
        <Route
          path="/RoundEnd"
          element={<StatisticsContainer roundEnd={true} />}
        />
        <Route path="/Menu" element={<MenuContainer />} />
        <Route path="/Rules" element={<RulesContainer />} />
        <Route path="/Settings" element={<SettingsContainer />} />
        <Route path="/Game" exact element={<GameContainer />} />
        <Route
          path="/Game/Free"
          exact
          element={<GameContainer isFreePlay={true} />}
        />
        <Route path="*" element={<MenuContainer />} />
      </Routes>
    </div>
  );
};

export default App;
