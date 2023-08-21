import React, { useState, useEffect } from "react";
import Board from "./Board";
import History from "./History";
// import { check } from "prettier";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  //tao state cho history va tung step choi
  const [history, setHistory] = useState([squares]);
  const [stepNumber, setStepNumber] = useState(0);

  //Declaring a Winner
  useEffect(() => {
    // Check and update winner whenever "squares" change
    // "Your code here";
    const newWinner = calculateWinner(squares);
    setWinner(newWinner);
  }, [squares]);

  //function to check if a player has won.
  //If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  //Input: squares: given an array of 9 squares:'X', 'O', or null.
  const calculateWinner = (squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  //Handle player
  const handleClick = (i) => {
    // "Your code here";
    // Ignore if game is over or that square box is already filled
    // Neu chua co winner, create a copy of squares array. And add X or O

    if (winner || squares[i]) {
      return;
    }

    const newSquares = [...squares];
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);

    const newHistory = history.slice(0, stepNumber + 1);
    // history.push(newSquares);
    setHistory([...newHistory, newSquares]);

    setStepNumber(stepNumber + 1);

    setXIsNext(!xIsNext);

    console.log({ xIsNext });
    console.log({ squares });
    console.log({ history });
    console.log({ stepNumber });
  };

  //Restart game
  const handleRestart = () => {
    const newSquares = Array(9).fill(null);
    setSquares(newSquares);
    setWinner(null);
    setXIsNext(true); //X is the first player.
    setHistory([newSquares]);
    setStepNumber(0);
  };

  //
  const moveTo = (step) => {
    setStepNumber(step);
    // X is always the first player, so it will be even
    setXIsNext(step % 2 === 0);

    // Set squares from history at the selected step
    setSquares(history[step]);
  };

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>

      <div className="game">
        {!winner ? (
          <span className="player">Player is: {xIsNext ? "X" : "O"}</span>
        ) : (
          <span className="player">Game is Over!</span>
        )}

        <Board squares={squares} handleClick={handleClick} />
      </div>

      <History history={history} moveTo={moveTo} />

      <button onClick={handleRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
