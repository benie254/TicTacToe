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

function Board() {
    // declare a state variable 'squares' 
    // that defaults to an array of 9 nulls 
    // corresponding to the existing 9 squares
    const [squares, setSquares] = useState(Array(9).fill(null));
    // add a new state
    const [xIsNext, setXIsNext] = useState(true);

    // define a handleClick function
    // to update the squares array 
    function handleClick(i) {
        // check if the square has an X or an O
        // if so, return the function early
        // also perform a check for the winner
        if (determineWinner(squares) || squares[i]) {
            return;
        }

        const nextSquares = squares.slice();
        
        // update -- to flip the next value 
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }

        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    // to display the winner
    const winner = determineWinner(squares);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${xIsNext? 'X' : 'O'}`;
    }

    return (
        <>  
            {/* to display the winnner */}
            <div className="status">{status}</div>
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

// to determine the winner
function determineWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// make this the main function (top-level component)
export default function Game() {
    // state to track which player is next
    const [xIsNext, setXIsNext] = useState(true);
    // state to track the history of moves
    const [history, setHistory] = useState([Array(9).fill(null)]);
    // to render squares for the current move
    // first, read the last squares from the history
    const currentSquares = history[history.length - 1];

    // will be called by the Board component 
    // to update the game
    function handlePlay(nextSquares) {

    }
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
        </div>
    )
}