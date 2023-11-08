import React, { useEffect } from "react";
import classNames from "classnames";

import RoundButton from "components/RoundButton";
import Icon from "components/Icon";

import "./InstallAppBanner.css";
import banner from "./banner-illustration.svg";
import bannerChrome from "./banner-illustration-chrome.svg";

import videoAndroid from "./emt-setup-android.mp4";
import videoIos from "./emt-setup-ios.mp4";

const BANNER_CLOSE_DATE = 'installAppBannerCloseDate';
const REMIND_IN = 1 * 24 * 60;

const isAndroid = /android/i.test(navigator.userAgent);
const isIos = /iphone|ipad/i.test(navigator.userAgent);
const isChrome = /chrome/i.test(navigator.userAgent) && !/firefox|ya/i.test(navigator.userAgent);
const isInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

const todayInMinutes = () => Math.floor(Date.now() / 60000);

const InstallBanner = ({ onRemindLater, onHowToAdd }) => {
  return (
    <div className="InstallAppBanner-wrapper">
      <div className="InstallAppBanner-img">
        <img src={banner} alt="" width="90" height="110" />
      </div>
      <div className="InstallAppBanner-text">

        <div className="InstallAppBanner-paragraph">
          <div className="InstallAppBanner-header">
            Add the game to Home Screen
          </div>
          <div className="InstallAppBanner-description">
            Game as an App gives a better experience. We don't send any notifications.
            It's simple, fast and secure.
          </div>
        </div>
        <div className="InstallAppBanner-actions">
          <button className="InstallAppBanner-altAction" onClick={onRemindLater}>
            <div className="InstallAppBanner-btnLabel">Remind me later</div>
          </button>
          <button className="InstallAppBanner-cta" onClick={onHowToAdd}>
            <div className="InstallAppBanner-btnLabel">How to Add</div>
          </button>
        </div>
      </div>
    </div>
  );
};

const OpenInChrome = ({ onRemindLater }) => {
  return (
    <div className="InstallAppBanner-wrapper">
      <div className="InstallAppBanner-img">
        <img src={bannerChrome} alt="" width="90" height="110" />
      </div>
      <div className="InstallAppBanner-text">

        <div className="InstallAppBanner-paragraph">
          <div className="InstallAppBanner-header">
            Open in Chrome
          </div>
          <div className="InstallAppBanner-description">
            Get better experience with Chrome browser. We don't send notifications.
            It's simple, fast and secure.
          </div>
        </div>
        <div className="InstallAppBanner-actions">
          <button className="InstallAppBanner-altAction" onClick={onRemindLater}>
            <div className="InstallAppBanner-btnLabel">Remind me later</div>
          </button>
        </div>
      </div>
    </div>
  )
};

const InstallAppBanner = () => {
  const videoRef = React.useRef();
  const [showVideo, setShowVideo] = React.useState(false);
  const [showBanner, setShowBanner] = React.useState(false);
  const classes = classNames("InstallAppBanner", { "InstallAppBanner--dim": showVideo });

  useEffect(() => {
    const bannerClosedDate = localStorage.getItem(BANNER_CLOSE_DATE) || 0;
    if (todayInMinutes() + REMIND_IN > bannerClosedDate && !isInstalled && (isAndroid || isIos)) {
      setShowBanner(true);
    }
  }, []);

  const onHowToAdd = () => {
    setShowVideo(true);
  }

  const onVideoClose = () => {
    setShowVideo(false);
    setShowBanner(false);
  }

  const onRemindLater = () => {
    localStorage.setItem(BANNER_CLOSE_DATE, todayInMinutes() + REMIND_IN);
    setShowBanner(false);
  }


  return (
    <React.Fragment>
      {showBanner && (
        <div className={classes}>
          {showVideo &&
            (<div className="InstallAppBanner-video">
              <div className="InstallAppBanner-videoClose">
                <RoundButton
                  onClick={onVideoClose}
                  title="Close video"
                  color="black"
                  small
                >
                  <Icon name="Cross" />
                </RoundButton>
              </div>
              <video ref={videoRef} autoPlay playsInline loop muted>
                {isAndroid && isChrome &&
                  <source src={videoAndroid} type="video/mp4" />
                }
                {isIos &&
                  <source src={videoIos} type="video/mp4" />
                }
              </video>
            </div>)}
          {(isAndroid && isChrome) &&
            <InstallBanner onRemindLater={onRemindLater} onHowToAdd={onHowToAdd} />
          }
          {(isIos) &&
            <InstallBanner onRemindLater={onRemindLater} onHowToAdd={onHowToAdd} />
          }
          {(isAndroid && !isChrome) &&
            <OpenInChrome onRemindLater={onRemindLater} />
          }
        </div>)}
    </React.Fragment>
  );
};

export default InstallAppBanner;
