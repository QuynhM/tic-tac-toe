import React from "react";

function History({ history, moveTo }) {
  const renderHistory = history.map((step, move) => {
    const description = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => moveTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div>
      <div className="history">
        <h4>History</h4>
        <ul>{renderHistory}</ul>
      </div>
    </div>
  );
}

export default History;
