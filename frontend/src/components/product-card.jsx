import React from "react";
import { Link } from "react-router";

export default function ProductCard({ card }) {
  return (
    <div className="w-fit min-w-80">
      <div className="bg-amber-100 p-5 text-black">
        <Link to = {`${card._id}`}>
          <div className="border rounded-2xl overflow-hidden w-full">
            <img
              src={card?.images?.[0]?.url || "https://placehold.co/200x200"}
              className="w-full object-cover aspect-video"
            />
          </div>
          <h1 className="text-2xl">{card.name}</h1>
          <h3 className="text-sm">{card.description}</h3>
          <h2 className="text-4xl font-bold">{card.price}</h2>
        </Link>
      </div>
      <button className="bg-red-400 w-full py-3 text-2xl font-semibold">
        ADD TO CART
      </button>
    </div>
  );
}
