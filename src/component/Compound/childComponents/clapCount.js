import React, {useContext} from "react";
import "./style.css";
import { clapContext } from "../clap";


const ClapCount = () => {
    const {clapCount, setRef} = useContext(clapContext);
  
    
    return (
        <span ref={setRef} data-refkeys="countRef" className="count">+ {clapCount}</span>
    )
}

export default ClapCount;