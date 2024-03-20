import React, { ReactElement, useState } from 'react';

interface ContextProps {
    handleSetDisplayValue: (num: string) => void;
    number: string;
    storedNumber: string;
    handleSetStoredValue: () => void;
    handleClearValue: () => void;
    handleSetCalcFunction: (type: string) => void;
    calculate: () => void;
    functionType: string;
}

export const NumberContext = React.createContext<ContextProps>({
    handleSetDisplayValue: () => { },
    number: "",
    storedNumber: "",
    functionType: "",
    handleSetStoredValue: () => { },
    handleClearValue: () => { },
    handleSetCalcFunction: () => { },
    calculate: () => { },
});

interface Props {
    children: ReactElement;
}

const NumberProvider: React.FC<Props> = ({ children }) => {

    const [number, setNumber] = useState('');
    const [storedNumber, setStoredNumber] = useState('');
    const [functionType, setFunctionType] = useState('');
    const handleSetDisplayValue = (num: string) => {
        if ((!number.includes('.') || num !== '.') && number.length < 8) {
            setNumber(`${(number + num).replace(/^0+/, '')}`);
        }
    };

    const handleSetStoredValue = () => {
        setStoredNumber(number);
        setNumber('');
    };

    const handleClearValue = () => {
        setNumber('');
        setStoredNumber('');
        setFunctionType('');
    };

    const handleSetCalcFunction = (type: string) => {
        if (number) {
            setFunctionType(type);
            handleSetStoredValue();
        }
        if (storedNumber) {
            setFunctionType(type);
        }
    };

    const calculate = () => {
        if (number && storedNumber) {
            let result = 0;
            switch (functionType) {
                case '+':
                    result = parseFloat(storedNumber) + parseFloat(number);
                    break;
                case '-':
                    result = parseFloat(storedNumber) - parseFloat(number);
                    break;
                case '/':
                    result = parseFloat(storedNumber) / parseFloat(number);
                    break;
                case '*':
                    result = parseFloat(storedNumber) * parseFloat(number);
                    break;
                default:
                    break;
            }
            result = Math.round(result * 100) / 100;
            setStoredNumber(result.toString());
            setNumber('');
        }
    };

    const contextValue: ContextProps = {
        handleSetDisplayValue,
        functionType,
        number,
        storedNumber,
        handleSetStoredValue,
        handleClearValue,
        handleSetCalcFunction,
        calculate,
    };

    return (
        <NumberContext.Provider value={contextValue}>
            {children}
        </NumberContext.Provider>
    );
};

export default NumberProvider;

