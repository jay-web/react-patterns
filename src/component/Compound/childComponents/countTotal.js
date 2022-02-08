import React, { useCallback, useContext } from "react";
import "./style.css";
import { clapContext } from "../clap";

const CountTotal = () => {

    const { clapTotal, setRef } = useContext(clapContext);
    
    return (

        <span ref={setRef} data-refkeys="totalRef" className="total">{clapTotal}</span>
    )
}

export default CountTotal;