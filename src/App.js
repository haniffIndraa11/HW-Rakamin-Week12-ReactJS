
import * as React from 'react';
import { useState } from 'react';

function RenderSquare({ value, onSquareClick }) {
  return (
    <button className="square" onClick={(onSquareClick)}>
      {value}
    </button>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]
  const moves = renderMoves();

  function restart() {
    RenderSquare([Array(9).fill(null)])
    setCurrentMove(0)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function renderMoves() {
    return history.map((squares, move) => {
      let description = '';
      if (move > 0) {
        description = 'Go to move #' + move;
      } else {
        description = 'Go to game start';
      }

      return (
        <li key={move}>
          <button className='border-2 m-auto w-[150px] border-gray-900 rounded bg-sky-500 hover:bg-sky-700' onClick={() => {
            jumpTo(move);
            if (move === 0) {
              setCurrentMove(0);
            }
          }}>
            {description}
          </button>
        </li>
      );
    }).slice(0, currentMove + 1);
  }

  return (
    <>  
        <div className='game flex justify-center items-center mt-20' >
          <div className='game-board'>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} restart={restart} />
          </div>
          <div className='game-info'>
            <ol>{moves}</ol>
          </div>
        </div>
        <button className='board-row bg-indigo-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none  rounded py-1 px-4 flex justify-center items-center m-auto my-5 ' onClick={restart}>
          restart
        </button>
    </>
  );
}

function Board({ xIsNext, squares, onPlay, restart }) {

  function selectSquare(i) {
    if (squares[i] || calculateWinner(squares)) return
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status = ''
  if (winner) {
    status = 'Winner is: ' + winner
  } else if (!winner) {
    status = 'Next Player: ' + (xIsNext ? 'X' : 'O')
  } else {
    status = 'Game Draw'
  }

  return (
    <>
      <div><p className='text-3xl'>Welcome to Tic-Tac-Toe</p></div>
      <div className='status text-2xl font-bold underline border-2 border-green-200 rounded'>{status}</div>
      <div className='board-row flex justify-center cursor-pointer flex-wrap w-[105px] h-[105px] m-auto ' >
        <RenderSquare value={squares[0]} onSquareClick={() => selectSquare(0)} />
        <RenderSquare value={squares[1]} onSquareClick={() => selectSquare(1)} />
        <RenderSquare value={squares[2]} onSquareClick={() => selectSquare(2)} />
        <RenderSquare value={squares[3]} onSquareClick={() => selectSquare(3)} />
        <RenderSquare value={squares[4]} onSquareClick={() => selectSquare(4)} />
        <RenderSquare value={squares[5]} onSquareClick={() => selectSquare(5)} />
        <RenderSquare value={squares[6]} onSquareClick={() => selectSquare(6)} />
        <RenderSquare value={squares[7]} onSquareClick={() => selectSquare(7)} />
        <RenderSquare value={squares[8]} onSquareClick={() => selectSquare(8)} />
      </div>

    </>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
}

function App() {
  return <Game />;
}

export default App;
