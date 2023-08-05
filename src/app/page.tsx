"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import { getProductData, productsArray } from "../components/products";
import Productcard from "@/components/Productcard";

export interface Product {
  id: number;
  name: string;
  price: number;
  photo: string;
  // Add other properties if required
}

const HomePage = () => {
  
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {/* Map through the products and create product cards */}
        {productsArray.map((product, idx) => (
          <div key={idx}>
            <Productcard product={product}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
