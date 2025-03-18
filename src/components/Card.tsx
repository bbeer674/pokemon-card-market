import React from "react";
import { useCart } from "../hooks/useCart";
import CartIcon from "../assets/icons/shopping-bag.svg";
import CartDisableIcon from "../assets/icons/shopping-bag-disable.svg";

interface CardProps {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  stock: number;
}

export const Card: React.FC<CardProps> = ({
  id,
  name,
  imageUrl,
  price,
  quantity,
  stock,
}) => {
  const addToCart = useCart((state) => state.addToCart);

  return (
    <div className="relative w-44 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <div className="absolute bottom-0 left-0 w-full h-[60%] bg-primary rounded-xl "></div>

      <div className="relative bg-transparent rounded-xl shadow-lg p-4 flex flex-col items-center">
        <div className="bg-transparent rounded-xl flex justify-center items-center p-4">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-40 object-contain rounded-md"
          />
        </div>

        <h2 className="text-white text-sm font-semibold mt-3">{name}</h2>

        <p
          className={`text-xs mt-1 ${
            quantity > 0 ? "text-secondary" : "text-gray-400"
          }`}
        >
          ${price.toFixed(2)} •{" "}
          {quantity > 0 ? `${quantity} Cards` : "Out of stock"}
        </p>

        <button
          className={`mt-4 w-full py-3 rounded-md font-semibold shadow-md flex items-center justify-center space-x-2 transition ${
            quantity > 0
              ? "bg-button-add text-white hover:bg-focus-button"
              : "bg-disable-button text-disable-button cursor-not-allowed"
          }`}
          onClick={() =>
            quantity > 0 &&
            addToCart({ id, name, imageUrl, price, quantity, stock })
          }
          disabled={quantity === 0}
        >
          <img
            src={quantity > 0 ? CartIcon : CartDisableIcon}
            alt="cart icon"
            className="w-5 h-5"
          />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
};
