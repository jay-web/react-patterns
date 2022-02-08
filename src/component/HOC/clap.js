import React, { useState } from "react";
import ClapIcon from "../subComponents/clapIcon";
import ClapCount from "../subComponents/clapCount";
import CountTotal from "../subComponents/countTotal";

import "../clap.css";

import withAnimation from "./withAnimation";

const initialState = {
  isClicked: false,
  clapCount: 0,
  clapTotal: 277,
};

const Clap = (props) => {
  const MAX_CLAP_COUNT = 5;
  const [clapState, setClapState] = useState(initialState);
  const { isClicked, clapCount, clapTotal } = clapState;
  

  const handleClapClick = () => {
    // call animation
    props.animationTimeLine.replay();

    setClapState((prevState) => ({
      isClicked: true,
      clapCount: Math.min(prevState.clapCount + 1, MAX_CLAP_COUNT),
      clapTotal:
        prevState.clapCount < MAX_CLAP_COUNT
          ? prevState.clapTotal + 1
          : prevState.clapTotal,
    }));
  };

  return (
    <div className="clapBox">
      <button id="clap"  className="clap" onClick={handleClapClick}>
        <ClapIcon isClicked={isClicked}  />
        <ClapCount count={clapCount}  />
        <CountTotal total={clapTotal} />
      </button>
      <h2>{props.title}</h2>
    </div>
  );
};



export default  withAnimation(Clap);
