import { useState } from "react";

// pass the value prop from the Board component
// pass down a click event prop
function Square({ value, onSquareClick }) {
    return (
        <button 
            className="square"
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

export default function Board() {
    // declare a state variable 'squares' 
    // that defaults to an array of 9 nulls 
    // corresponding to the existing 9 squares
    const [squares, setSquares] = useState(Array(9).fill(null));

    return (
        <>  
            {/* pass the value prop down to each Square rendered */}
            <div className="board-row">
                <Square value={squares[0]} />
                <Square value={squares[1]} />
                <Square value={squares[2]} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} />
                <Square value={squares[4]} />
                <Square value={squares[5]} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} />
                <Square value={squares[7]} />
                <Square value={squares[8]} />
            </div>
        </>
    );
}