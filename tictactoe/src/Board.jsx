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

    // define a handleClick function
    // to update the squares array 
    function handleClick(i) {
        const nextSquares = squares.slice();
        nextSquares[i] = "X";
        setSquares(nextSquares);
    }

    return (
        <>  
            {/* pass the value prop down to each Square rendered */}
            <div className="board-row">
                {/* - pass a click event to prop of the first square
                    - update the click event
                */}
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    );
}