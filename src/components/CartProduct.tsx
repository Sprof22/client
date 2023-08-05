import { CartContext } from "../../CartContext";
import { useContext } from "react";
import { getProductData } from "./products";

function CartProduct(props: any) {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const productData = getProductData(id);
  if (productData) {
    return (
      <>
        <div className="flex justify-between">
          <div>
            <h3>{productData.title}</h3>
            <p>{quantity} total</p>
            <p>${(quantity * productData.price).toFixed(2)}</p>
          </div>
          <div>
            <button
              className="px-4 py-2 mt-4 rounded bg-red-500"
              onClick={() => cart.deleteFromCart(id)}
            >
              Remove
            </button>
          </div>
        </div>
          <hr></hr>
      </>
    );
  }
}

export default CartProduct;
