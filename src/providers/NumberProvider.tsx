import React, { ReactElement, useState } from "react";

interface ContextProps {
    input: string;
    handleInput: (inputValue: string) => void;
}

export const NumberContext = React.createContext<ContextProps>({
    input: "",
    handleInput: () => { },
});

interface Props {
    children: ReactElement;
}

const NumberProvider: React.FC<Props> = ({ children }) => {
    const [input, setInput] = useState("");

    const reset = () => {
        setInput("");
    };

    const remove = () => {
        setInput(input.substring(0, input.length - 1));
    };

    const solve = (input: string) => {
        const result = eval(input);
        setInput(result.toString());
    };

    const handleInput = (value: string): void => {
        switch (value) {
            case "=":
            case "Enter":
                solve(input);
                break;
            case "Clear":
            case "Escape":
                reset();
                break;
            case "Remove":
            case "Backspace":
                remove();
                break;
            default:
                if (/^[0-9+\-*/.()]$/.test(value)) {
                    setInput(prevInput => prevInput + value);
                }
                break;
        }
    };


    const contextValue: ContextProps = {
        input,
        handleInput,
    };

    return (
        <NumberContext.Provider value={contextValue}>
            {children}
        </NumberContext.Provider>
    );
};

export default NumberProvider;

