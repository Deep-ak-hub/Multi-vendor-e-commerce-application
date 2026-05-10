import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ProductDetails() {
  const [state, setState] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/products/public/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setState(res);
      });
  }, [id]);

  console.log(state);

  if (!state) {
    return "Loading...";
  }

  return (
    <div className="flex">
      {state?.data?.images.map((image) => {
        return (
          <picture className="bg-white w-40 h-40">
           
            <img
              src={image.url}
              alt={image._id}
              className="w-full h-full object-contain"
            ></img>
          </picture>
        );
      })}
      <div></div>
    </div>
  );
}
