import React from "react";
import "./style.css";

const ClapCount = ({count, setRef }) => {
    return (
        <span id="count" ref={setRef} data-refkeys="countRef" className="count">+ {count}</span>
    )
}

export default ClapCount;