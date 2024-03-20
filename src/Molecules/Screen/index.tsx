import { useContext } from "react";
import "./style.scss";
import { NumberContext } from "../../providers/NumberProvider";


const Screen = () => {
    const { number, storedNumber } = useContext(NumberContext);
    return (
        <div className="screen">
            {!number && !storedNumber ? 0 : number || storedNumber}
        </div>
    )
}

export default Screen;