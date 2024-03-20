import rows from "./rows";

import "./style.scss";

const Row = () => {
    return (
        <div>
            {rows.map((row, index) => (
                <div key={index} className="container">{row.buttons}</div>
            ))}
        </div>
    );
}

export default Row;
