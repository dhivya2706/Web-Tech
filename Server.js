const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const movies = [
  { name: "Leo", seats: 5, price: 200 },
  { name: "Jailer", seats: 0, price: 180 },
  { name: "Avatar", seats: 10, price: 250 }
];

app.post("/search", (req, res) => {
  const { movie } = req.body;

  const found = movies.find(
    m => m.name.toLowerCase() === movie.toLowerCase()
  );

  if (!found) {
    return res.json({ available: false });
  }

  if (found.seats > 0) {
    return res.json({
      available: true,
      price: found.price
    });
  } else {
    return res.json({ available: false });
  }
});

app.listen(5000, () => console.log("Server running on 5000"));
