import React from "react";
import "./SettingsLayout.css";

import Header from "components/Header";
import Icon from "components/Icon";
import RoundButton from "components/RoundButton";
import Radio from "components/Radio";
import Checkbox from "components/Checkbox";
import NumberInput from "components/NumberInput";
import Button from "components/Button";

const SettingsLayout = ({
  gameModeOptions,
  timeLimitOptions,

  isDictListLoaded,

  settings,
  dicts,

  onChangeSettings,
  onSelectDicts,

  dictionariesList,

  returnToMenu,
  killCache,
}) => {
  return (
    <div className="SettingsLayout">
      <Header
        leftButton={
          <RoundButton title="Back to menu" small ghost {...returnToMenu}>
            <Icon name="Back" />
          </RoundButton>
        }
        fixed
      >
        <h1>Settings</h1>
      </Header>

      <div className="SettingsLayout-block">
        <label className="SettingsLayout-label">game mode:</label>
        <Radio
          options={gameModeOptions}
          value={settings.gameMode}
          onWhenChange={onChangeSettings("gameMode")}
          color="red"
        />
      </div>

      <div className="SettingsLayout-block">
        {settings.gameMode ? (
          <>
            <label className="SettingsLayout-label">time limit:</label>
            <Radio
              options={timeLimitOptions}
              value={settings.timeLimit}
              onWhenChange={onChangeSettings("timeLimit")}
              color="red"
            />
          </>
        ) : (
          <>
            <label className="SettingsLayout-label">card set:</label>
            <NumberInput
              color="red"
              min={3}
              max={10}
              value={settings.cardSet}
              onWhenChange={onChangeSettings("cardSet")}
            />
          </>
        )}
      </div>

      <div className="SettingsLayout-block">
        <label className="SettingsLayout-label">dictionaries:</label>
        <div className="DictsSelector">
          <div className="DictsSelector-wrapper">
            {isDictListLoaded ? (
              <>
                {Object.keys(dictionariesList).map((dict, index) => (
                  <div className="DictsSelector-dict" key={index+dictionariesList[dict].title}>
                    <Checkbox
                      label={dictionariesList[dict].title}
                      value={dict}
                      onWhenChange={onSelectDicts(dict)}
                      checked={dicts[dict]}
                    />
                  </div>
                ))}
              </>
            ) : (
              <div className="DictsSelector-preloader">
                <Icon name="Preloader" />
                <div className="DictsSelector-preloader-text">
                  Please, be patient while we loading our best words
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="SettingsLayout-block">
        <label className="SettingsLayout-layout">for debugging purposes:</label>
        <Button color="red" title="Clean, refetch" {...killCache} />
      </div>

      <div className="SettingsLayout-block">
        <label className="SettingsLayout-tip">
          Settings are saving automatically
        </label>
      </div>
    </div>
  );
};

export default SettingsLayout;
