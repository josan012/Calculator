import { useContext, useEffect } from "react";
import buttons from "../../Atoms/Button/buttons";
import { NumberContext } from "../../providers/NumberProvider";
import "./style.scss";

const Table = () => {
    const { handleInput } = useContext(NumberContext);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => handleInput(event.key);

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleInput]);


    return (
        <div className="table">
            {buttons.map(button => <button key={button.value} className={button.className} onClick={() => handleInput(button.value)}>{button.value}</button>)}
        </div>
    );
};

export default Table;
