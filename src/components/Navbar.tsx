import React, { useState, useContext } from "react";
import { CartContext } from "../../CartContext";
import FeatherIcon from "feather-icons-react";
import CartProduct from "./CartProduct";
const Navbar = () => {
  const cart = useContext(CartContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

const stripeCheckout = async () => {
  console.log(cart.items, "cart items");
  await fetch('/api/store-checkout', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items: cart.items }) // Wrap cart.items in an object with the "items" property
  }).then((response) => {
    return response.json();
  }).then((response) => {
    if (response.url) {
      window.location.assign(response.url); // Forwarding user to Stripe
    }
  });
}


  return (
    <>
      <div className="bg-red-300 w-full">
        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white w-full">
          <div className="text-xl font-bold">Ecommerce Store</div>
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Cart ({productsCount} Items)
          </button>
        </nav>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-slate-500 bg-opacity-50">
          <div className="bg-slate-300 p-4 rounded shadow">
            <div className="flex justify-end">
              <button onClick={closeModal} className="text-xl text-black text-sm mb-4">
                {/* <FeatherIcon icon="close" /> */}close
              </button>
            </div>
            <div className="text-xl font-bold mb-2">Shopping Cart</div>
            {productsCount > 0 ? (
              <>
                <p>Items In your Cart:</p>
                {cart.items.map((item, idx) => (
                  <CartProduct 
                  key={idx}
                  id={item.id}
                  quantity={item.quantity}
                  />
                ))}
                <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
                <button className="px-4 py-2 mt-4 bg-green-500 text-white rounded" onClick={stripeCheckout }>Purchase Items</button>
              </>
            ) : (
              <h1>Shopping Cart is Empty</h1>
            )}
            {/* <button
              onClick={closeModal}
              className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
            >
              Close
              <FeatherIcon icon="person" />
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
