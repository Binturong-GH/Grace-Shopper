//cart list component, could reuse this on checkout page?

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCart,
  fetchUserCart,
  deleteProduct,
} from '../store/slices/cartSlice';

const CartList = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectCart);

  const cartRows = cartItems.map((cartItem) => {
    return (
      <tr key={cartItem.id}>
        <td>{cartItem.title}</td>
        <td>{cartItem.price}</td>
        <td>{cartItem.quantity}</td>
        <td>
          <button
            onClick={() => {
              dispatch(deleteProduct(cartItem.id));
            }}
          >
            Remove from Cart
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div>
        {cartItems && cartItems.length ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{cartRows}</tbody>
          </table>
        ) : (
          <p>Your cart is currently empty - start shopping!</p>
        )}
      </div>
    </div>
  );
};

export default CartList;
