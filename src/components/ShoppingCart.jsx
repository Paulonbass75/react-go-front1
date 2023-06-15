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
  const handleCheckout = () => {
    // Handle the checkout logic here
    console.log("Checkout");
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="my-20 px-20 bg-white rounded-xl border-slate shadow-md flex flex-col justify-center items-center max-w-[450px] w-full">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div className="space-y-4">
          {store.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <h2 className="text-lg font-bold">{item.name}</h2>
              <h3>${item.price}</h3>
              <h4>{item.quantity}</h4>
              <button
                onClick={() => removeFromCart(item)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={handleCheckout}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded"
        >
          Checkout
        </button>
      </div>
      <div>
        {cart.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <h2 className="text-lg font-bold">{item.name}</h2>
            <br />
            <h3>${item.price}</h3>
            <br />
            <h4>{item.quantity}</h4>
            <button
              onClick={() => addToCart(item)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
  //   return (
  //     <div className="flex justify-center items-center h-full">
  //       <div className="my-20 px-20 bg-white rounded-xl border-slate shadow-md flex flex-col justify-center items-center max-w-[450px] w-full">
  //       <h1>Shopping Cart</h1>
  //       <div>
  //         {store.map((item, index) => (
  //           <div key={index}>
  //             <h2>{item.name}</h2>
  //             <h3>${item.price}</h3>
  //             <h4>{item.quantity}</h4>
  //             <button onClick={() => removeFromCart(item)}>Remove</button>
  //           </div>
  //         ))}
  //       </div>
  //       </div>
  //       <div>
  //         {cart.map((item, index) => (
  //           <div key={index}>
  //             <h2>{item.name}</h2>
  //             <br />
  //             <h3>${item.price}</h3>
  //             <br />
  //             <h4>{item.quantity}</h4>
  //             <button onClick={() => addToCart(item)}>Add</button>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

 