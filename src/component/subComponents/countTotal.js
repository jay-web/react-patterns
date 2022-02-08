import React from "react";
import "./style.css";

const CountTotal = ({ total, setRef }) => {
    return (
        <span id="total" ref={setRef} data-refkeys="totalRef" className="total">{total}</span>
    )
}

export default CountTotal;