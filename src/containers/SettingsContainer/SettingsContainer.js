import React from "react";
import GameStore from "utils/GameStore";
import Dictionary from "utils/Dictionary";
import { isDevelopment } from "utils/Helpers";
import SettingsLayout from "layouts/SettingsLayout";

const gameModeOptions = [
  {
    title: "Time attack",
    value: true,
  },
  {
    title: "Cards set",
    value: false,
  },
];

const timeLimitOptions = [
  isDevelopment() && {
    title: "3 sec",
    value: 3,
  },
  {
    title: "Half of minute",
    value: 30,
  },
  {
    title: "1 minute",
    value: 60,
  },
  {
    title: "3 minutes",
    value: 60 * 3,
  },
  {
    title: "5 minutes",
    value: 60 * 5,
  },
];

function SettingsContainer() {
  const [settings, setSettings] = React.useState({
    ...GameStore.loadSettings(),
  });
  const [dicts, setDicts] = React.useState({ ...GameStore.loadDicts() });
  const [dictionariesList, setDictionariesList] = React.useState();
  const [isDictListLoaded, setIsDictListLoaded] = React.useState(false);

  React.useEffect(() => {
    (async function loadDictsOnEnter() {
      const dictFallback = () => {
        return !Object.keys(dicts).reduce(
          (prev, cur) => prev || dicts[cur],
          false
        );
      };

      const dictList = await Dictionary.list();
      if (dictFallback()) {
        let fallback = {};
        Object.keys(dictList).forEach((element) => {
          fallback[element] = true;
        });
        setDicts({ dicts: fallback });
        GameStore.saveDicts(fallback);
      }

      setIsDictListLoaded(true);
      setDictionariesList(dictList);
    })();
  }, []);

  const onChangeSettings = (set) => (value) => () => {
    isDevelopment() && console.log("Settings updated");

    setSettings((prev) => {
      const updatedSettings = {
        ...prev,
        [set]: value,
      };

      GameStore.saveSettings(updatedSettings);

      return updatedSettings;
    });
  };

  const onSelectDicts = (set) => (event) => {
    setDicts((prev) => {
      const updatedDicts = { ...prev, [set]: event.target.checked };

      GameStore.saveDicts(updatedDicts);

      return updatedDicts;
    });
  };

  const killCache = async () => {
    GameStore.unsetSettings();
    let dictList;
    try {
      dictList = await Dictionary.list(true);
    } catch (error) {
      return isDevelopment() && console.error("Error on fetching dictionaries list", error);
    }

    try {
      await Object.keys(dictList).forEach((element) => {
        Dictionary.get(element, true);
      });
    } catch (error) {
      return isDevelopment() && console.error("Error on fetching dictionaries", error);
    }
  };

  return (
    <SettingsLayout
      gameModeOptions={gameModeOptions}
      timeLimitOptions={timeLimitOptions}
      settings={settings}
      dicts={dicts}
      dictionariesList={dictionariesList}
      onChangeSettings={onChangeSettings}
      onSelectDicts={onSelectDicts}
      isDictListLoaded={isDictListLoaded}
      returnToMenu={{ link: "/Menu" }}
      killCache={{ onClick: killCache }}
    />
  );
}

export default SettingsContainer;
