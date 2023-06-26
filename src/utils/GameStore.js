import { roundEfficiency, isDevelopment } from "utils/Helpers.js";
import Dictionary from "utils/Dictionary";

const MAX_STATS_COUNT = 20;
const GAME_SETTINGS = "gameSettings";
const GAME_SELECTED_DICTS = "gameDicts";
const GAME_STATS = "gameStats";

export default class GameStore {

  static firstRun = async function () {
    if (!localStorage.getItem(GAME_SELECTED_DICTS)) {

      const dictList = await Dictionary.list();
      let fallback = {};

      Object.keys(dictList).forEach((element) => {
        fallback[element] = true;
      });
      console.log('constructor', fallback);

      this.saveDicts(fallback);
    }
  }

  static loadSettings = function () {
    const DEFAULT_SETTINGS = {
      gameMode: true,
      timeLimit: 30,
      cardSet: 5
    };

    return JSON.parse(localStorage.getItem(GAME_SETTINGS)) || DEFAULT_SETTINGS;
  };

  static saveSettings = function (newSettings) {
    isDevelopment() && console.log("Saving settings: ", newSettings);

    localStorage.setItem(GAME_SETTINGS, JSON.stringify(newSettings));
  };

  static saveDicts = function (newDicts) {
    isDevelopment() && console.log("Saving dicts: ", newDicts);

    localStorage.setItem(GAME_SELECTED_DICTS, JSON.stringify(newDicts));
  };

  static loadDicts = function () {
    return JSON.parse(localStorage.getItem(GAME_SELECTED_DICTS)) || {};
  };

  static loadStats = function (showBest = true) {
    let stats = JSON.parse(localStorage.getItem(GAME_STATS)) || [];

    if (showBest && stats.length > 1) {
      let bestScore = { value: +stats[0].efficiency, index: 0 };
      stats.forEach((element, index) => {
        if (+element.efficiency >= bestScore.value) {
          bestScore.value = +element.efficiency;
          bestScore.index = index;
        }
      });
      stats[bestScore.index].bestScore = true;
    }
    isDevelopment() && console.log('%c Statistics loaded ', 'background: #222; color: #bada55');

    return stats;
  };

  static pushStats = function ({
    gameMode,
    right,
    wrong,
    skipped,
    time,
    timeLimit,
    timeStamp
  }) {
    let stats = this.loadStats(false).slice(0, MAX_STATS_COUNT - 1) || [];
    stats.unshift({
      gameMode,
      right,
      wrong,
      skipped,
      time,
      timeLimit,
      timeStamp,
      efficiency: roundEfficiency(right, time)
    });

    localStorage.setItem(GAME_STATS, JSON.stringify(stats));
  };

  static unsetSettings = function () {
    localStorage.removeItem(GAME_SETTINGS);
    localStorage.removeItem(GAME_SELECTED_DICTS);
    localStorage.removeItem(GAME_STATS);
  };

  static clearStats = function () {
    localStorage.removeItem(GAME_STATS);
  };
}
