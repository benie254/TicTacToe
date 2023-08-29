import { useState } from "react";

function Square() {
    // declare a state variable 'squares' 
    // that defaults to an array of 9 nulls 
    // corresponding to the existing 9 squares
    const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick() {
        setValue('X');
    }
    return (
        <button 
            className="square"
            onClick={handleClick}
        >
            {value}
        </button>
    );
}

export default function Board() {
    return (
        <>
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
        </>
    );
}