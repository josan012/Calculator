import React, { KeyboardEvent, ReactElement, useState } from 'react';

interface ContextProps {
    input: string;
    reset: () => void;
    solve: (expression: string) => void;
    remove: () => void;
    handleInput: (inputValue: string | Event) => void;
};

export const NumberContext = React.createContext<ContextProps>({
    input: "",
    reset: () => { },
    solve: () => { },
    remove: () => { },
    handleInput: () => { },
},
);

interface Props {
    children: ReactElement;
}

const NumberProvider: React.FC<Props> = ({ children }) => {

    const [input, setInput] = useState("")

    const reset = () => {
        setInput("")
    }

    const remove = () => {
        setInput(input.substring(0, input.length - 1))
    }

    const solve = (input: string) => {
        eval(input);
    }

    const handleInput = (inputValue: string | KeyboardEvent) => {
        if (typeof inputValue === 'string') {
            const value = inputValue;
            if (value === '=') {
                solve(input);
            } else if (value === 'Clear') {
                reset();
            } else if (value === 'Remove') {
                remove();
            } else {
                setInput(prevInput => prevInput + value);
            }
        } else {
            const event = inputValue;
            const { key } = event;
            if (/^[0-9+\-*/.()]$/.test(key)) {
                setInput(prevInput => prevInput + key);
            } else if (key === 'Enter') {
                solve(input);
            } else if (key === 'Escape') {
                reset();
            } else if (key === 'Backspace') {
                remove();
            }
        }
    };

    document.addEventListener('keydown', (event: Event) => {
        if (event instanceof KeyboardEvent) {
            handleInput(event);
        }
    });



    const contextValue: ContextProps = {
        input,
        reset,
        solve,
        remove,
        handleInput,
    };

    return (
        <NumberContext.Provider value={contextValue}>
            {children}
        </NumberContext.Provider>
    );
};

export default NumberProvider;

