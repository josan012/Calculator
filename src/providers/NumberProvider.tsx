import React, { ReactElement, useEffect, useState } from 'react';

interface ContextProps {
    input: string;
    reset: () => void;
    evaluate: (expression: string) => void;
    solve: (expression: string) => void;
    remove: () => void;
    handleButtonClick: (value: string) => void;
}

type OperatorStack = Array<string>;

type OperandStack = Array<number>;

export const NumberContext = React.createContext<ContextProps>({
    input: "",
    reset: () => { },
    evaluate: () => { },
    solve: () => { },
    remove: () => { },
    handleButtonClick: () => { },
});

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

    const evaluate = (expression: string) => {
        const stack = [];

        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];

            if (char === '(') {
                stack.push(char);
            } else if (char === ')') {
                if (stack.length === 0 || stack.pop() !== '(') {
                    return false;
                }
            } else if (isOperator(char)) {
                if (i === 0 || isOperator(expression[i - 1])) {
                    return false;
                }
            } else if (isNaN(parseInt(char, 10))) {
                return false;
            }
        }
        return stack.length === 0;
    };

    const isOperator = (char: string) => ['+', '-', '*', '/'].includes(char);

    const applyOperation = (operator: string, operand1: number, operand2: number) => {
        switch (operator) {
            case '+':
                return operand1 + operand2;
            case '-':
                return operand1 - operand2;
            case '*':
                return operand1 * operand2;
            case '/':
                if (operand2 !== 0) {
                    return operand1 / operand2;
                } else {
                    throw new Error('Division by zero error');
                }
            default:
                throw new Error('Invalid operator');
        }
    };

    const solve = (expression: string) => {
        if (evaluate(expression) !== false) {
            const operators: OperatorStack = [];
            const operands: OperandStack = [];

            for (let i = 0; i < expression.length; i++) {
                const char = expression[i];

                if (char === '(') {
                    operators.push(char);
                } else if (char === ')') {
                    while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                        const operator = operators.pop();
                        const operand2 = operands.pop();
                        const operand1 = operands.pop();
                        operands.push(applyOperation(operator!, operand1!, operand2!));
                    }
                    operators.pop();
                } else if (isOperator(char)) {
                    while (
                        operators.length > 0 &&
                        precedence(operators[operators.length - 1]) >= precedence(char)
                    ) {
                        const operator = operators.pop();
                        const operand2 = operands.pop();
                        const operand1 = operands.pop();
                        operands.push(applyOperation(operator!, operand1!, operand2!));
                    }
                    operators.push(char);
                } else if (!isNaN(parseInt(char, 10))) {
                    let num = char;
                    while (i + 1 < expression.length && !isOperator(expression[i + 1]) && expression[i + 1] !== '(' && expression[i + 1] !== ')') {
                        num += expression[i + 1];
                        i++;
                    }
                    operands.push(parseFloat(num));
                } else {
                    throw new Error('Invalid character');
                }
            }

            while (operators.length > 0) {
                const operator = operators.pop();
                const operand2 = operands.pop();
                const operand1 = operands.pop();
                operands.push(applyOperation(operator!, operand1!, operand2!));
            }
            setInput(String(operands.pop()));
            return operands.pop();
        } else {
            reset();
        }
    };

    const precedence = (operator: string) => {
        switch (operator) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            default:
                return 0;
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
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
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [input]);

    const handleButtonClick = (value: string) => {
        if (value === '=') {
            solve(input);
        } else if (value === 'Clear') {
            reset();
        } else if (value === 'Remove') {
            remove();
        } else {
            setInput(prevInput => prevInput + value);
        }
    };


    const contextValue: ContextProps = {
        input,
        reset,
        evaluate,
        solve,
        remove,
        handleButtonClick,
    };

    return (
        <NumberContext.Provider value={contextValue}>
            {children}
        </NumberContext.Provider>
    );
};

export default NumberProvider;

