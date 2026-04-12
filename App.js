import React, { useState } from "react";
import SuperResolution from "./components/SuperResolution";
import Degradation from "./components/Degradation";
import Grayscale from "./components/Grayscale";

function App() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null); // stores uploaded image

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0])); // create temporary URL
    }
  };

  return (
    <div>
      <h1>Image Processing Demo</h1>

      <input
        type="text"
        placeholder="Enter description"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input type="file" accept="image/*" onChange={handleImage} />

      {/* Pass props */}
      <SuperResolution text={text} image={image} />
      <Degradation text={text} image={image} />

      {/* Pass children */}
      <Grayscale text={text}>
        {image && <img src={image} alt="input" width="200" />}
      </Grayscale>
    </div>
  );
}

export default App;