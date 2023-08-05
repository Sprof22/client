import React from 'react'
import { CartContext } from "../../CartContext";
import { useContext } from "react";
import Image from "next/image";

const Productcard = (props: any) => {
    const product = props.product;
    console.log(product);
    const cart = useContext(CartContext);
    let productQuantity = product?.id ? (cart.getProductQuantity(product.id) as number) : 0;
  return (
    <div
            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <Image
              src={product.image}
              alt={product.title}
              width={600}
              height={400}
            />
            <h2 className="text-lg text-black font-semibold">{product.title}</h2>
            <h2 className="text-lg text-black font-semibold">
              ${product.price}
            </h2>
            {productQuantity > 0 ? (
              <>
                <div className="flex justify-between">
                  <div className="text-black flex">
                    In Cart: {productQuantity}
                  </div>
                  <div className="flex gap-3">
                    {/* Buttons in the second div */}
                    <button className="bg-blue-500 rounded-sm p-2" onClick={() => cart.addOneToCart(product.id)}>+</button>
                    <button className="bg-blue-500 rounded-sm p-2" onClick={() => cart.removeOneFromCart(product.id)}>-</button>
                  </div>
                </div>
                  <button className="bg-red-500 rounded-sm p-2 my-2" onClick={() => cart.deleteFromCart(product.id)}>Remove from Cart</button>
              </>
            ) : (
              <button
                className="bg-blue-500 rounded-sm p-2"
                onClick={() => cart.addOneToCart(product.id)}
              >
                Add to Cart
              </button>
            )}
            {/* Add other product details here */}
          </div>
  )
}

export default Productcard