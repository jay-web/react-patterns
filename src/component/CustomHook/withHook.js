import React, { useState, useLayoutEffect } from "react";
import mojs from "mo-js";

const useWithAnimation = ({ clapRef, countRef, totalRef }) => {
  const [animationTimeLine, setAnimationTimeLine] = useState(
    () => new mojs.Timeline()
  );
  
  useLayoutEffect(() => {
    if (!clapRef || !countRef || !totalRef) {
      return;
    }
    

    // scaling button animation
    let scaleButton = new mojs.Html({
      el: clapRef,
      duration: 300,
      scale: { 1.3: 1 },
      easing: mojs.easing.ease.out,
    });

    // animate opacity and present of counter
    let moveCounter = new mojs.Html({
      el: countRef,
      duration: 300,
      opacity: { 0: 1 },
      y: { 0: -30 },
    }).then({
      opacity: { 1: 0 },
      y: -80,
      delay: 300 / 2,
    });

    // animate clap total component opacity
    let showTotal = new mojs.Html({
      el: totalRef,
      duration: 300,
      delay: (300 * 3) / 2,
      opacity: { 0: 1 },
      y: { 0: -3 },
    });

    // animate burst
    const burst = new mojs.Burst({
      parent: clapRef,
      radius: { 50: 195 },
      count: 10,
      duration: 2000,
      children: {
        shape: ["circle", "polygon"],

        fill: ["#333", "magenta", "purple"],
        angle: { 0: 180 },

        degreeShift: "rand(-360, 360)",

        delay: "stagger(0, 25)",
        easing: mojs.easing.ease.in,
        speed: 0.7,
      },
    });

    let newAnimation = animationTimeLine.add([
      scaleButton,
      moveCounter,
      showTotal,
      burst,
    ]);
    
    clapRef.style.transform = "scale(1,1)";

    setAnimationTimeLine(newAnimation);
  }, [clapRef, countRef, totalRef]);

 
  return animationTimeLine;
};

export default useWithAnimation;
