function Product() {
  const products = ["Popcorn", "Coke", "Nachos"];

  const addToCart = (item) => {
    localStorage.setItem("product", item);
    alert(item + " added");
  };

  return (
    <div>
      <h2>Snacks</h2>
      {products.map((p, i) => (
        <div key={i}>
          {p}
          <button onClick={() => addToCart(p)}>Add</button>
        </div>
      ))}
    </div>
  );
}

export default Product;
