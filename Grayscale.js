import React from "react";

function Grayscale({ text, children }) {
  return (
    <div>
      <h2>Grayscale</h2>
      <p>{text}</p>

      <div>
        <p>Input:</p>
        {children}
      </div>

      <div style={{ filter: "grayscale(100%)" }}>
        <p>Output (Grayscale):</p>
        {children}
      </div>
    </div>
  );
}

export default Grayscale;