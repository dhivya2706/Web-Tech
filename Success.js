function Success() {
  const price = localStorage.getItem("price");
  const movie = localStorage.getItem("movie");

  return (
    <div>
      <h2>Booking Successful 🎉</h2>
      <p>Movie: {movie}</p>
      <p>Ticket Price: ₹{price}</p>
    </div>
  );
}

export default Success;
