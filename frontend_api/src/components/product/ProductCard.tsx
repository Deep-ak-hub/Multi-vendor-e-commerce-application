import { HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  image: string;
  isFavourite?: boolean;
  description: string;
  onProductClick: (id: number) => void;
};

export const ProductCard = ({
  id,
  title,
  price,
  description,
  image,
  isFavourite = false,
  onProductClick,
}: ProductCardProps) => {
  const [isFav, setIsFav] = useState(isFavourite);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFav(!isFav);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Buying product ${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Added product ${id} to cart`);
  };

  return (
    <div
      onClick={() => onProductClick(id)}
      className="card product-card flex flex-col justify-between"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="product-card-image object-cover h-40"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 focus:outline-none transition cursor-pointer hover:scale-110 bg-white/60 backdrop-blur-sm p-1.5 rounded-full"
        >
          <HeartIcon
            className={`size-5 ${isFav ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </button>
      </div>

      <h2 className="mt-3 font-semibold text-lg">{title}</h2>

      <p className="text-neutral-500 text-sm line-clamp-2 mt-1">
        {description}
      </p>

      <div className="flex items-center justify-between mt-3 mb-4">
        <p className="product-card-price text-base">Rs. {price}</p>
      </div>

      <div className="flex gap-2 w-full">
        <button onClick={handleBuyNow} className="btn-primary btn-sm flex-1 cursor-pointer">
          Buy Now
        </button>
        <button
          onClick={handleAddToCart}
          className="btn-secondary btn-sm flex-1 cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
