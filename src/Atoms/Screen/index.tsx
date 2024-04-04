import { useContext } from "react";
import { NumberContext } from "../../providers/NumberProvider";

import "./style.scss";


const Screen = () => {
    const { input } = useContext(NumberContext);
    return (
        <div className="screen">
            {input}
        </div>
    )
}

export default Screen;