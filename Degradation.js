import React from "react";

function Degradation({ text, image }) {
  if (!image) return <p>No image uploaded yet.</p>;

  return (
    <div>
      <h2>Degradation</h2>
      <p>{text}</p>
      <p>Input:</p>
      <img src={image} width="200" alt="input" />
      <p>Output (simulated degraded):</p>
      <img src={image} width="120" alt="output" />
    </div>
  );
}

export default Degradation;