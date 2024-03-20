import Button from "../../Atoms/Button";

const rows = [
    {
        id: 0,
        mode: "special",
        buttons: <div className="special">
            <Button content="clear" isZero={false} status="" />
            <Button content="/" isOperator={true} status="operator" />
        </div>
    },
    {
        id: 1,
        mode: "normal",
        buttons: <div className="normal">
            <Button content="7" status="number" />
            <Button content="8" status="number" />
            <Button content="9" status="number" />
            <Button content="-" isOperator={true} status="operator" />
        </div>
    },
    {
        id: 2,
        mode: "normal",
        buttons: <div className="normal">
            <Button content="4" status="number" />
            <Button content="5" status="number" />
            <Button content="6" status="number" />
            <Button content="+" isOperator={true} status="operator" />
        </div>
    },
    {
        id: 3,
        mode: "normal",
        buttons: <div className="normal">
            <Button content="1" status="number" />
            <Button content="2" status="number" />
            <Button content="3" status="number" />
            <Button content="*" isOperator={true} status="operator" />
        </div>

    },
    {
        id: 4,
        mode: "special",
        buttons: <div className="special">
            <Button content="0" isZero={true} status="" />
            <Button content="=" status="operator" />
        </div>
    }
];

export default rows;
