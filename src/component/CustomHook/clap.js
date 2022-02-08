import React, { useCallback, useState } from "react";
import ClapIcon from "../subComponents/clapIcon";
import ClapCount from "../subComponents/clapCount";
import CountTotal from "../subComponents/countTotal";

import "../clap.css";

import useWithAnimation from "./withHook";

const initialState = {
  isClicked: false,
  clapCount: 0,
  clapTotal: 277,
};

const ClapWithHook = (props) => {
  const MAX_CLAP_COUNT = 5;
  const [clapState, setClapState] = useState(initialState);
  const { isClicked, clapCount, clapTotal } = clapState;
  const [ {clapRef, countRef, totalRef}, setRefState ] = useState({});

  const animationTimeLine = useWithAnimation({clapRef, countRef, totalRef});

  const setRef = useCallback((node) => {
      setRefState((prevRefState) => (
        { ...prevRefState, [node.dataset.refkeys] : node }
      ))
  }, [])

  const handleClapClick = () => {
    animationTimeLine.replay();
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
      <button ref={setRef}  data-refkeys="clapRef" className="clap" onClick={handleClapClick}>
        <ClapIcon isClicked={isClicked} setRef={setRef}/>
        <ClapCount count={clapCount} setRef={setRef} />
        <CountTotal total={clapTotal} setRef={setRef} />
      </button>
      <h2>{props.title}</h2>
    </div>
  );
};



export default  ClapWithHook;
