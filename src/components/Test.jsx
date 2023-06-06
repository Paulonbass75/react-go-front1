//this compnent is just for testing smaller components
import React from "react";

export default function Test() {
  //Landing page with caards and featured products, search bar and scrollable content cards
  const content = [
    {
      title: "Card 1",
      description: "This is a card",
      image: "https://www.autometaldirect.com/images/Pillars.jpg",
      link: "/",
    },
    {
      title: "Card 2",
      description: "This is a card",
      image: "https://www.autometaldirect.com/images/Bed-Floor-Assembly.jpg",
      link: "/",
    },
    {
      title: "Card 3",
      description: "This is a card",
      image:
        "https://www.autometaldirect.com/images/Convertible-Top-Switches.jpg",
      link: "/",
    },
    {
      title: "Card 4",
      description: "This is a card",
      image: "https://www.autometaldirect.com/images/Power-Window-Switches.jpg",
      link: "/",
    },
  ];

  const featured = [
    {
      title: "Featured 1",
      description: "This is a card",
      image: "https://picsum.photos/200/300",

      link: "/",
    },
    {
      title: "Featured 2",
      description: "This is a card",
      image: "https://picsum.photos/200/300",

      link: "/",
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
    <div className="col-md-3" key={index}>
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
    <div className="col-md-4" key={index}>
      <div className="card mb-4 shadow-lg">
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

  return (
    <div className="container">
      <div className="">
        <div className="">
          <div className="col-md-12">
            <h1 className="text-center">Featured Products</h1>
            <div className="row justify-content-center">{featuredCards}</div>
            <h1 className="text-center">Products</h1>
            <div className="row justify-content-center">{cards}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
