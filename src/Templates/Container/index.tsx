import "./style.scss"
import Screen from "../../Molecules/Screen";
import Table from "../../Organisms/Table";

const Container = () => {
    return (
        <div className="calculator">
            <Screen />
            <Table />
        </div>
    )
}

export default Container;