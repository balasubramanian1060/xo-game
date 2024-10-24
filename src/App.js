import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const x = "X";
  const o = "O";

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [options, setOptions] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState(x);
  const [status, setStatus] = useState(`${x} Your Turn`);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    checkWinner();
  }, [options]);

  const boxClick = (index) => {
    if (options[index] !== "" || !running) return;
    
    const newOptions = [...options];
    newOptions[index] = currentPlayer;
    setOptions(newOptions);
    changePlayer();
  };

  const changePlayer = () => {
    setCurrentPlayer((prev) => (prev === x ? o : x));
    setStatus(`${currentPlayer === x ? o : x} Your Turn`);
  };

  const checkWinner = () => {
    let isWon = false;
    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (options[a] && options[a] === options[b] && options[a] === options[c]) {
        isWon = true;
        setStatus(`${options[a]} You Won!`);
        setRunning(false);
        return;
      }
    }
    if (!options.includes("")) {
      setStatus("Game Draw!");
      setRunning(false);
    }
  };

  const restartGame = () => {
    setOptions(Array(9).fill(""));
    setCurrentPlayer(x);
    setStatus(`${x} Your Turn`);
    setRunning(true);
  };

  return (
    <div className="App">
    <div className="container">
      <div className="grid">
        {options.map((value, index) => (
          <div key={index} className="box" onClick={() => boxClick(index)}>
            {value}
          </div>
        ))}
      </div>
      <div id="status">{status}</div>
      <button id="restart" onClick={restartGame}>Restart</button>
    </div>
  </div>
);
};


export default App;
