"use client"
import React, { createContext, useState, ReactNode } from "react";
import { productsArray, getProductData } from "./src/components/products";

export interface Product {
  id: number;
  quantity: number;
  title: string;
}

interface CartContextValue {
  items: Product[];
  getProductQuantity: (id: number) => number;
  addOneToCart: (id: number) => void;
  removeOneFromCart: (id: number) => void;
  deleteFromCart: (id: number) => void;
  getTotalCost: () => number;
}

export const CartContext = createContext<CartContextValue>({
  items: [],
  getProductQuantity: () => 0,
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  function getProductQuantity(id: number) {
    const product = cartProducts.find((product) => product.id === id);
  
    if (product) {
      return product.quantity;
    }
  
    return 0;
  }

  function addOneToCart(id: number) {
    const quantity = getProductQuantity(id);
  
    const productData = getProductData(id);
    if (!productData) {
      console.error(`Product data not found for id: ${id}`);
      return;
    }
  
    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
          title: productData.title, // Include the title from productData
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }
  

  function removeOneFromCart(id: number) {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(id: number) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => currentProduct.id !== id)
    );
  }

  function getTotalCost() {
    let totalCost = 0;
    cartProducts.forEach((cartItem) => {
      const productData = getProductData(cartItem.id);
  
      // Check if productData is defined before calculating the cost
      if (productData) {
        totalCost += productData.price * cartItem.quantity;
      }
    });
    return totalCost;
  }
  

  const contextValue: CartContextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
