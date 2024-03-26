import React, { ReactElement, useCallback, useState } from "react";

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

    const reset = () => setInput("");

    const solve = useCallback((input: string) => {
        if (input.trim().length === 0) {
            return;
        }

        const validInputRegex = /^[0-9()+\-*/.\s]*$/;

        if (!validInputRegex.test(input)) {
            return;
        }

        try {
            const result = eval(input);
            setInput(result.toString());
        } catch (error) {
            console.error("Invalid input:", error);
        }
    }, []);


    const handleInput = useCallback((value: string) => {
        switch (value) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "+":
            case "-":
            case "*":
            case "/":
            case "(":
            case ")":
                setInput(prevInput => prevInput + value);
                break;
            case "Enter":
            case "=":
                solve(input);
                break;
            case "Escape":
            case "Clear":
                reset();
                break;
            case "Backspace":
            case "Remove":
                setInput(input.substring(0, input.length - 1));
                break;
            default:
                break;
        }
    }, [input, solve]);


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

