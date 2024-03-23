import buttons from "../../Atoms/Button/buttons";

import "./style.scss";

const Table = () => {
    return (
        <div className="table">
            {buttons.map(button => <button key={button.value} className={button.className}>{button.value}</button>)}
        </div>
    );
};

export default Table;
