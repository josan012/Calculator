import buttons from "../../Atoms/Button/buttons";

import "./style.scss";

const Table = () => {
    return (
        <div className="table">
            {buttons.map(button => button.button)}
        </div>
    );
};

export default Table;
