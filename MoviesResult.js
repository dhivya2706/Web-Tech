import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MovieResult() {
  const navigate = useNavigate();

  useEffect(() => {
    const movie = localStorage.getItem("movie");

    fetch("http://localhost:5000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ movie })
    })
      .then(res => res.json())
      .then(data => {
        if (data.available) {
          localStorage.setItem("price", data.price);
          navigate("/payment");
        } else {
          navigate("/notavailable");
        }
      });
  }, []);

  return <h3>Checking availability...</h3>;
}

export default MovieResult;
