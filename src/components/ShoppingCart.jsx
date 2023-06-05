import React from 'react'


//shopping cart component for eccomerce site
export default function ShoppingCart() {

    const store = [
        {
            id: 1,
            name: "item1",
            price: 1.00,
            quantity: 1
        },
    ]

    const cart = [
        {
            id: 1,
            name: "item1",
            price: 1.00,
            quantity: 1
        },
    ]

    //add item to cart
    const addToCart = (item) => {
        //check if item is already in cart
        for (let i = 0; i < store.length; i++) {
            if (item.id === store[i].id) {
                
            }
        }



        //if item is in cart, increase quantity by 1
        if (store.length === 0) {
            //if cart is empty, add item to cart
        }

        //if item is not in cart, add item to cart
    }
    

  return (
    <div>ShoppingCart</div>

  )
}
