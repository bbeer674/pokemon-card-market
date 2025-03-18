import React from "react";
import { useCart } from "../hooks/useCart";
import CloseIcon from "../assets/icons/x.svg";

interface CartProps {
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ onClose }) => {
  const cart = useCart((state) => state.cart);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const setCart = useCart((state) => state.setCart);
  const addToCart = useCart((state) => state.addToCart);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const clearAllItems = () => {
    setCart([]);
  };

  return (
    <aside
      className={`fixed top-0 right-0 w-96 h-full bg-primary shadow-lg p-6 flex flex-col transition-transform duration-300 ease-in-out translate-x-0`}
    >
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-white">Cart</h2>
          <button
            className="text-secondary text-sm hover:underline text-left mt-1"
            onClick={clearAllItems}
          >
            Clear all
          </button>
        </div>

        <button
          className="bg-accent h-10 w-10 rounded-md shadow-md hover:bg-opacity-80 transition flex items-center justify-center"
          onClick={onClose}
        >
          <img src={CloseIcon} alt="close icon" className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto space-y-3">
        {cart.length === 0 ? (
          <p className="text-gray-400 text-center">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="p-3 shadow-md">
              <div className="flex justify-between items-start">
                <div className="flex space-x-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-16 object-cover rounded"
                  />

                  <div>
                    <p className="text-white text-sm font-semibold truncate max-w-[120px]">
                      {item.name}
                    </p>
                    <p className="text-secondary text-xs">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <p className="text-white text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3">
                <button
                  className="w-1/6 bg-button-add text-white py-3 rounded-md hover:bg-gray-600 transition"
                  onClick={() => removeFromCart(item.id)}
                >
                  -
                </button>
                <div className="w-1/2 bg-button-add  text-white text-center py-3 rounded-md">
                  {item.quantity}
                </div>
                <button
                  className="w-1/6 bg-button-add text-white py-3 rounded-md hover:bg-gray-600 transition"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-white">
            <p>Total card amount</p>
            <p>{totalQuantity}</p>
          </div>
          <div className="flex justify-between text-lg font-semibold text-white mt-2">
            <p>Total price</p>
            <p>${totalPrice.toLocaleString()}</p>
          </div>
          <button className="mt-4 w-full py-3 rounded-md font-semibold shadow-md bg-accent hover:bg-[#e96b5e] transition">
            Continue to Payment
          </button>
        </div>
      )}
    </aside>
  );
};
