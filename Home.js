import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [movie, setMovie] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    localStorage.setItem("movie", movie);
    navigate("/result");
  };

  return (
    <div>
      <h2>Movie Booking</h2>
      <input
        placeholder="Enter movie name"
        onChange={(e) => setMovie(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Home;
