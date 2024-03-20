import Container from "../../Templates/Container";
import NumberProvider from "../../providers/NumberProvider";
import "./style.scss"

const Calculator = () => {
    return (
        <div className="page">
            <NumberProvider>
                <Container />
            </NumberProvider>
        </div>
    )
}

export default Calculator;