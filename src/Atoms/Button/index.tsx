import React, { useContext } from "react";
import { NumberContext } from "../../providers/NumberProvider";

import "./style.scss"

interface Props {
    status: string;
    content: string;
    isZero?: boolean;
    isOperator?: boolean;
}

const Button: React.FC<Props> = ({ status, content, isZero, isOperator }) => {
    const { handleSetDisplayValue, handleClearValue, handleSetCalcFunction, calculate } = useContext(NumberContext);
    const handleSpecialButtons = (isZero: boolean) => {
        if (isZero) {
            handleSetDisplayValue(content);
        } else {
            handleClearValue();
        }
    }

    const handleOperatorButtons = (isOperator: boolean) => {
        if (isOperator) {
            handleSetCalcFunction(content);
        } else {
            calculate();
        }
    }

    if (status === 'number') {
        return (<button className="number" onClick={() => handleSetDisplayValue(content)}>
            {content}
        </button>)
    } else if (status === 'operator') {
        return (<button className="operator" onClick={() => handleOperatorButtons(isOperator || false)}>
            {content}
        </button>)
    } else {
        return (<button className="special-button" onClick={() => handleSpecialButtons(isZero || false)}>
            {content}
        </button>)
    }
}

export default Button;