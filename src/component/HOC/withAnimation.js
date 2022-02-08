import React, { Component } from "react";
import mojs from "mo-js";

const withAnimation = (WrappedComponent, props) => {

  class WithAnimation extends Component {
   
    // * Create another component
    constructor() {
      super();
      this.state = {
        animationTimeLine: new mojs.Timeline(),
      };
      
    }

    componentDidMount() {
     
      // scaling button animation
      let scaleButton = new mojs.Html({
        el: "#clap",
        duration: 300,
        scale: { 1.3: 1 },
        easing: mojs.easing.ease.out,
      });

      // animate opacity and present of counter
      let moveCounter = new mojs.Html({
        el: "#count",
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
        el: "#total",
        duration: 300,
        delay: (300 * 3) / 2,
        opacity: { 0: 1 },
        y: { 0: -3 },
      });

      // animate burst
      const burst = new mojs.Burst({
        parent: "#clap",
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

      let el = document.getElementById("clap");
      el.style.transform ="scale(1, 1)";

      let newAnimation = this.state.animationTimeLine.add([
        scaleButton,
        moveCounter,
        showTotal,
        burst,
      ]);
      this.setState({ animationTimeLine: newAnimation });
    }

    render() {
     
      return (
        <WrappedComponent
          {...this.props}
          animationTimeLine={this.state.animationTimeLine}
         
        />
      ); // * return passed component after addition feature
    }
  }

  return WithAnimation
};

export default withAnimation;
