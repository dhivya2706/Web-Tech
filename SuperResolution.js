import React from "react";

function SuperResolution({ text, image }) {
  if (!image) return <p>No image uploaded yet.</p>;

  return (
    <div>
      <h2>Super Resolution</h2>
      <p>{text}</p>
      <p>Input:</p>
      <img src={image} alt="input" width="200" />
      <p>Output (simulated):</p>
      <img src={image} alt="output" width="300" />
    </div>
  );
}
export default SuperResolution;