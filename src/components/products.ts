// const productsArray = [
//     { id: 1, name: "Product 1", photo: "https://media.istockphoto.com/id/1502885532/photo/tourists-african-american-are-showing-happy-expressions-while-waiting-for-their-journey-in.jpg?s=612x612&w=0&k=20&c=DdPvIMNGVvsXsii_m3aUlKrxLWhmMM8_qBsIxfQvVVg=", price: getRandomPrice() },
//     { id: 2, name: "Product 2", photo: "https://media.istockphoto.com/id/1401340105/photo/portrait-of-a-cheerful-girl-in-casuals-with-backpack-standing-on-stairs-in-school.jpg?s=612x612&w=0&k=20&c=nKnuHON2e-HJ6u-GOwofg-GhEWTR6zPiaDGidYBgpkA=", price: getRandomPrice() },
//     { id: 3, name: "Product 3", photo: "https://media.istockphoto.com/id/1475224704/photo/smile-travel-or-business-woman-on-phone-for-networking-social-media-or-communication-in.jpg?s=612x612&w=0&k=20&c=-IzmHlWgOM36w8i55qEI0n8c5h_CQ_XUVpW7gFE1nKc=", price: getRandomPrice() },
//     { id: 4, name: "Product 4", photo: "https://media.istockphoto.com/id/1502885532/photo/tourists-african-american-are-showing-happy-expressions-while-waiting-for-their-journey-in.jpg?s=612x612&w=0&k=20&c=DdPvIMNGVvsXsii_m3aUlKrxLWhmMM8_qBsIxfQvVVg=", price: getRandomPrice() },
//     { id: 5, name: "Product 5", photo: "https://media.istockphoto.com/id/1475224704/photo/smile-travel-or-business-woman-on-phone-for-networking-social-media-or-communication-in.jpg?s=612x612&w=0&k=20&c=-IzmHlWgOM36w8i55qEI0n8c5h_CQ_XUVpW7gFE1nKc=", price: getRandomPrice() },
//     { id: 6, name: "Product 6", photo: "https://media.istockphoto.com/id/1401340105/photo/portrait-of-a-cheerful-girl-in-casuals-with-backpack-standing-on-stairs-in-school.jpg?s=612x612&w=0&k=20&c=nKnuHON2e-HJ6u-GOwofg-GhEWTR6zPiaDGidYBgpkA=", price: getRandomPrice() },
//     { id: 7, name: "Product 7", photo: "https://media.istockphoto.com/id/1502885532/photo/tourists-african-american-are-showing-happy-expressions-while-waiting-for-their-journey-in.jpg?s=612x612&w=0&k=20&c=DdPvIMNGVvsXsii_m3aUlKrxLWhmMM8_qBsIxfQvVVg=", price: getRandomPrice() },
//     { id: 8, name: "Product 8", photo: "https://media.istockphoto.com/id/1401340105/photo/portrait-of-a-cheerful-girl-in-casuals-with-backpack-standing-on-stairs-in-school.jpg?s=612x612&w=0&k=20&c=nKnuHON2e-HJ6u-GOwofg-GhEWTR6zPiaDGidYBgpkA=", price: getRandomPrice() },
//     { id: 9, name: "Product 9", photo: "https://media.istockphoto.com/id/1475224704/photo/smile-travel-or-business-woman-on-phone-for-networking-social-media-or-communication-in.jpg?s=612x612&w=0&k=20&c=-IzmHlWgOM36w8i55qEI0n8c5h_CQ_XUVpW7gFE1nKc=", price: getRandomPrice() },
//     // Add more products here
// ];

// // Function to generate a random price between 10 and 100 (for example)
// function getRandomPrice() {
//     return Math.floor(Math.random() * 91) + 10; // Generates a random integer between 10 and 100
// }


//   function getProductData(id: number){
//     let productData = productsArray.find(product => product.id === id);
//     if(productData === undefined){
//         console.log("Product data does not exist for: " + id)
//         return undefined
//     }

//     return productData;
//   }


//   export {productsArray, getProductData};


  // Coffee: price_1LnUTFDM1jwCEz8OGoOSXiSM
// Sunglasses: price_1LnUTxDM1jwCEz8OAqHYTwKQ
// Camera: price_1LnUUoDM1jwCEz8OvxIcJ7to

const productsArray = [
  {
      id: "price_1NaEybDEQmgYkM8JUZTYnunz",
      title: "Product A",
      price: 4.99
  },
  {
      id: "price_1NXnGHDEQmgYkM8JExm0hROG",
      title: "Soap",
      price: 34.99
  }
];

function getProductData(id: any) {
  let productData = productsArray.find(product => product.id === id);

  if (productData == undefined) {
      console.log("Product data does not exist for ID: " + id);
      return undefined;
  }

  return productData;
}

export { productsArray, getProductData };