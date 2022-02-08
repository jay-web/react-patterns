import React from "react";
import Clap from "./component/HOC/clap";
import ClapWithHook from "./component/CustomHook/clap";
import { ClapWithCompound } from "./component/Compound/clap";
import "./App.css";



const App = () => {
  return (
    <div className="main">
      <Clap title="Integrating animation using HOC" />
      <ClapWithHook title="Integrating animation using Custom hook"/>
      <ClapWithCompound title="Compound Pattern" />
    </div>
  );
};

export default App;
