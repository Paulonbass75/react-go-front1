import React, { useState } from "react";
import { useDB } from "./contexts/Context";
import { Link } from "react-router-dom";

export default function CategoryCards(props) {
  return (
    <>
      <div
        id={props.id}
        className="grid grid-rows-1 mx-6 mt-4 rounded-lg shadow-xl w-[300px] h-[300px] bg-white"
      >
        <img
          className="card-img-top object-contain w-full rounded-lg aspect-square"
          src={`https://www.autometaldirect.com/images/${props.img}`}
          alt={props.name}
        />
        <div className="bg-white rounded-b-lg border-t-black border-t">
          <h3 className="text-lg font-medium text-center">{props.name}</h3>
        </div>
      </div>
    </>
  );
}
