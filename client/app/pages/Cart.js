//cart screen page

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartList from "../components/CartList";
import { fetchUserCart, addToCart } from "../store";
import { selectCart } from "../store/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectCart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserCart(), []);
  });

  const redirectToPaymentPage = () => {
    navigate("/payment");
  };

  const subtotal = cartItems
    .reduce(
      (sum, currentItem) => sum + currentItem.price * currentItem.quantity,
      0
    )
    .toFixed(2);
  const shipping = (cartItems.length ? 5 : 0).toFixed(2);
  const tax = ((parseFloat(subtotal) + parseFloat(shipping)) * 0.0425).toFixed(
    2
  );
  const total = (
    parseFloat(subtotal) +
    parseFloat(shipping) +
    parseFloat(tax)
  ).toFixed(2);

  return (
    <>
      <CartList />

      <p>subtotal: ${subtotal}</p>
      <p>shipping: ${shipping}</p>
      <p>tax: ${tax}</p>
      <p>order total: ${total}</p>

      <button onClick={redirectToPaymentPage}>Proceed to Checkout</button>
      <button
        onClick={() => {
          console.log("proceeding to checkout!");
        }}
      >
        Proceed to Checkout
      </button>
    </>
  );
};

export default Cart;
