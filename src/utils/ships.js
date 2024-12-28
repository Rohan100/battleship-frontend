import Ship1 from "../components/ships/Ship1";
import Ship2 from "../components/ships/Ship2";
import Ship3 from "../components/ships/Ship3";
import Ship4 from "../components/ships/Ship4";
import Ship5 from "../components/ships/Ship5";

export const allShips = [
    {
        len : 5,
        getShip: (props) =>
            <Ship1
                axis={props.axis}
                len={5}
                col={props.col}
                row={props.row}
                key={5}
            />
    },{
        len : 4,
        getShip: (props) =>
            <Ship2
                axis={props.axis}
                len={4}
                col={props.col}
                row={props.row}
                key={4}
            />
    },
    {
        len : 3,
        getShip: (props) =>
            <Ship3
                axis={props.axis}
                len={3}
                col={props.col}
                row={props.row}
                key={3}
            />
    },{
        len : 3,
        getShip: (props) =>
            <Ship4
                axis={props.axis}
                len={3}
                col={props.col}
                row={props.row}
                key={2}
            />
    },{
        len : 2,
        getShip: (props) =>
            <Ship5
                axis={props.axis}
                len={2}
                col={props.col}
                row={props.row}
                key={1}
            />
    }
]