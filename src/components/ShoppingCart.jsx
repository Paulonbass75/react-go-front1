import React, { useState } from "react";

export default function ShoppingCart() {
  const [store, setStore] = useState([
    {
      id: 1,
      name: "item1",
      price: 1.0,
      quantity: 1,
    },
  ]);

  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    // Check if item is already in cart
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // If item is already in cart, increase quantity by 1
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // If item is not in cart, add item to cart
      setCart((prevCart) => [...prevCart, item]);
    }
  };

  // Remove item from cart
  const removeFromCart = (item) => {
    setStore((prevStore) =>
      prevStore.filter((storeItem) => storeItem.id !== item.id)
    );
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== item.id)
    );
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div>
        {store.map((item, index) => (
          <div key={index}>
            <h2>{item.name}</h2>
            <h3>${item.price}</h3>
            <h4>{item.quantity}</h4>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </div>
        ))}
      </div>
      <div>
        {cart.map((item, index) => (
          <div key={index}>
            <h2>{item.name}</h2>
            <h3>${item.price}</h3>
            <h4>{item.quantity}</h4>
            <button onClick={() => addToCart(item)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}
