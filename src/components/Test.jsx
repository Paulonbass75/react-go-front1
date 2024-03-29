//this compnent is just for testing smaller components
import React from "react";
// import Modal from "../composables/Modal";

export default function Test() {
  //Landing page with caards and featured products, search bar and scrollable content cards
  const content = [
    {
      title: "Card 1",
      description: "This is a card",
      image: "https://www.autometaldirect.com/images/Pillars.jpg",
      link: "/shoppingcart",
    },
    {
      title: "Card 2",
      description: "This is a card",
      image: "https://www.autometaldirect.com/images/Bed-Floor-Assembly.jpg",
      link: "/shoppingcart",
    },
    {
      title: "Card 3",
      description: "This is a card",
      image:
        "https://www.autometaldirect.com/images/Convertible-Top-Switches.jpg",
      link: "/shoppingcart",
    },
    {
      title: "Card 4",
      description: "This is a card",
      image: "https://www.autometaldirect.com/images/Power-Window-Switches.jpg",
      link: "/shoppingcart",
    },
  ];

  const featured = [
    {
      title: "Featured 1",
      description: "This is a card",
      image: "https://picsum.photos/200/300",

      link: "/shoppingcart",
    },
    {
      title: "Featured 2",
      description: "This is a card",
      image: "https://picsum.photos/200/300",

      link: "/shoppingcart",
    },
  ];

  const cards = content.map((card, index) => (
    // <div className="col-md-3 flex">
    //   <div className="col-md-3" key={index}>
    //     <div className="card mb-4 shadow-lg items-center">
    //       <img className="card-img-top " src={card.image} alt="Card cap" />
    //       <div className="card-body">
    //         <h5 className="card-title">{card.title}</h5>
    //         <p className="card-text">{card.description}</p>
    //       </div>
    //       <div className="d-flex justify-content-between align-items-center">
    //         <div className="btn-group">
    //           <a href={card.link} className="btn btn-sm btn-outline-secondary">
    //             View
    //           </a>
    //           <a href={card.link} className="btn btn-sm btn-outline-secondary">
    //             Add to cart
    //           </a>
    //         </div>
    //
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div key={index}>
      <div className="card mb-4 shadow-lg ">
        <img className="card-img-top" src={card.image} alt="Card cap" />
        <div className="card-body">
          <h5 className="card-title">{card.title}</h5>
          <p className="card-text">{card.description}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <a href={card.link} className="btn btn-sm btn-outline-secondary">
              View
            </a>
            <br />
            <a href={card.link} className="btn btn-sm btn-outline-secondary">
              Add to cart
            </a>
          </div>
        </div>
      </div>
    </div>
  ));

  const featuredCards = featured.map((card, index) => (
    
    <div key={index}>
      <div className="card mb-4 shadow-lg">
        <img className="card-img-top" src={card.image} alt="Card cap" />
        <div className="card-body">
          <h5 className="card-title">{card.title}</h5>
          <p className="card-text">{card.description}</p>
        </div>
        <div className="d-flex justify-between align-items-center">
          <div className="btn-group">
            <a href={card.link} className="btn btn-sm btn-outline-secondary">
              View
            </a>
            <br />
            <a href={card.link} className="btn btn-sm btn-outline-secondary">
              Add to cart
            </a>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    
    <div className="container  ">
      <div className="">
        <div className="">
          <div className="p-5 ">
            <h1 className="text-center text-2xl font-bold font-poppins my-10">Featured Products</h1>
            <div className="flex flex-row justify-evenly flex-wrap w-full">{featuredCards}</div>
            <h1 className="text-center text-2xl font-bold font-poppins my-10 w-full">Products</h1>
            <div className="flex flex-row justify-evenly flex-wrap">{cards}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


//grid mx-3 gap-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 