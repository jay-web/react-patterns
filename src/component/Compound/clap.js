import React, { useCallback, useState, createContext, useMemo } from "react";
import ClapIcon from "./childComponents/clapIcon";
import ClapCount from "./childComponents/clapCount";
import CountTotal from "./childComponents/countTotal";

import "../clap.css";

import useWithAnimation from "../CustomHook/withHook";

const initialState = {
  isClicked: false,
  clapCount: 0,
  clapTotal: 277,
};

export const clapContext = createContext();
const { Provider } = clapContext;

const ClapWithHook = ({title, children}) => {
  const MAX_CLAP_COUNT = 5;
  const [clapState, setClapState] = useState(initialState);
  // const { isClicked, clapCount, clapTotal } = clapState;
  const [{ clapRef, countRef, totalRef }, setRefState] = useState({});

  const animationTimeLine = useWithAnimation({ clapRef, countRef, totalRef });

  const setRef = useCallback((node) => {
    
    if(node == null){
      return;
    }
    setRefState((prevRefState) => ({
      ...prevRefState,
      [node.dataset.refkeys]: node,
    }));
  }, []);

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

  const memoizedValue = useMemo(() => ({
    ...clapState,
    setRef
  }), [clapState, setRef])

  return (
    <Provider value={memoizedValue}>
      <div className="clapBox">
        <button
          ref={setRef}
          data-refkeys="clapRef"
          className="clap"
          onClick={handleClapClick}
        >
          {children}
        </button>
        <h2>{title}</h2>
      </div>
    </Provider>
  );
};

ClapWithHook.icon = ClapIcon;
ClapWithHook.count = ClapCount;
ClapWithHook.total = CountTotal;

export const ClapWithCompound = ({title}) => {
  return (
    
      <ClapWithHook title={title}>
        <ClapWithHook.icon />
        <ClapWithHook.count />
        <ClapWithHook.total />
      </ClapWithHook>
    
  );
};
