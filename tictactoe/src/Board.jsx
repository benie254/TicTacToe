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

// allow the component to receive props
function Board({ xIsNext, squares, onPlay }) {
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

        // to enable the Game component to update the Board 
        // when the user clicks a square
        onPlay(nextSquares);
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

// make this the main function (top-level component)
export default function Game() {
    // state to track the history of moves
    // defaults to an array of 9 nulls 
    // corresponding to the existing 9 squares
    const [history, setHistory] = useState([Array(9).fill(null)]);
    // define a state variable
    // to help keep track of the user's steps
    const [currentMove, setCurrentMove] = useState(0);
    // reconfigure
    // do not store xIsNext as a separate state variable
    const xIsNext = currentMove % 2 === 0;
    // to render squares for the current move
    // first, read the last squares from the history
    const currentSquares = history[currentMove];

    // will be called by the Board component 
    // to update the game
    function handlePlay(nextSquares) {
        // the '...' spread syntax means 'enumerate all items in--'
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove){
        setCurrentMove(nextMove);
    }

    // transform moves from history into React elements 
    const moves = history.map(
        (squares, move) => {
            let description;
            if (move > 0) {
                description = `Go to move #${move}`;
            } else {
                description = `Start over`;
            }
            return (
                // add a key
                <li key={move}>
                    <button
                        onClick={() => jumpTo(move)}
                    >
                        {description}
                    </button>
                </li>
            );
        }
    );
    return (
        <div className="game">
            <div className="game-board">
                {/* pass props to the Board component */}
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            {/* enable users to jump to moves or start over */}
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
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
