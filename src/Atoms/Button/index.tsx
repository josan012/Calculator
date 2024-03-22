import React, { useContext } from "react";
import { NumberContext } from "../../providers/NumberProvider";

import "./style.scss"

interface Props {
    status: string;
    content: string;
    className?: string;
}

const Button: React.FC<Props> = ({ status, content, className }) => {
    const { handleButtonClick } = useContext(NumberContext);

    if (status === 'number') {
        return (<button className={`number ${className}`} onClick={() => handleButtonClick(content)}>
            {content}
        </button>)
    } else if (status === 'operator') {
        return (<button className={`operator ${className}`} onClick={() => handleButtonClick(content)}>
            {content}
        </button>)
    }
    return null;

}

export default Button;