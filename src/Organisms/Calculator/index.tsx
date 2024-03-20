import Table from "../../Molecules/Table";
import Screen from "../../Molecules/Screen";
import NumberProvider from "../../providers/NumberProvider";

import "./style.scss"

const Calculator = () => {
    return (
        <div className="page">
            <NumberProvider>
                <div className="container">
                    <Screen />
                    <Table />
                </div>
            </NumberProvider>
        </div>
    )
}

export default Calculator;