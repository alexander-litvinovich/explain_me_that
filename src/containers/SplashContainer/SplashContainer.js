import React from "react";
import SplashLayout from "layouts/SplashLayout";
import { useNavigate } from "react-router-dom";

const SplashContainer = () => {
  let navigate = useNavigate();

  const navToMenu = () => {
    navigate("/Menu");
  };

  setTimeout(navToMenu, 1000);

  return <SplashLayout onClick={navToMenu} />;
};

export default SplashContainer;
