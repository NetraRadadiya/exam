import React, { useState } from "react";
import "./App.css";

const GroceryItem = ({ name, price, image }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < 5) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="grocery-item">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{price}</p>
      <div className="quantity-controls">
        <button onClick={decreaseQuantity} disabled={quantity === 1}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={increaseQuantity} disabled={quantity === 5}>
          +
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [groceries, setGroceries] = useState([]);
  const [fetched, setFetched] = useState(false);

  const fetchGroceries = async () => {
    const response = await fetch(
      "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-groceries"
    );
    const data = await response.json();
    setGroceries(data.data);
    setFetched(true);
  };

  return (
    <div className="App">
      <h1>Groceries</h1>
      {!fetched ? (
        <button onClick={fetchGroceries}>Get Groceries</button>
      ) : (
        <div className="grocery-list">
          {groceries.map((item) => (
            <GroceryItem
              key={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;