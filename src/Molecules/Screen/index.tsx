import { useContext } from "react";
import { NumberContext } from "../../providers/NumberProvider";

import "./style.scss";


const Screen = () => {
    const { number, storedNumber } = useContext(NumberContext);
    return (
        <div className="screen">
            {!number && !storedNumber ? 0 : number || storedNumber}
        </div>
    )
}

export default Screen;