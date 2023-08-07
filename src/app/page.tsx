"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect } from "react";
import { getProductData, productsArray } from "../components/products";
import Productcard from "@/components/Productcard";
import OneSignal from "react-onesignal"
import Head from "next/head";

export interface Product {
  id: number;
  name: string;
  price: number;
  photo: string;
  // Add other properties if required
}

const handleTag = (tag: string) => {
  console.log("tagging");
  OneSignal.sendTag("tech", tag).then(()=> {
    console.log("tagged")
  })
}

const HomePage = () => {

  const loadOneSignal = async () => {
    await OneSignal.init({ appId: '67e906f1-b244-472d-94e9-18cf890aca65' , allowLocalhostAsSecureOrigin: true});
    OneSignal.showSlidedownPrompt();
  }

  useEffect(() => {
    loadOneSignal()
  }, [])
  return (
    <div>
      <Head>
        <script
          async
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
        ></script>
      </Head>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {/* Map through the products and create product cards */}
        {productsArray.map((product, idx) => (
          <div key={idx}>
            <Productcard product={product} />
          </div>
        ))}

        <button onClick={() => handleTag("react")}>React</button>
        <button onClick={() => handleTag("vue")}>Vue</button>
        <button onClick={() => handleTag("angular")}>Angular</button>
      </div>
    </div>
  );
};

export default HomePage;
