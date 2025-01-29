import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { removeFoodItemFromCart, updateFoodItemQuantity } from "../../Slices/cartSlice";
import { IoMdArrowRoundBack } from "react-icons/io";
import Bottom from "../bottom";
import { Link, useNavigate } from "react-router-dom";
import { BuyFoodOrder } from "../../Services/CustomerAPI.js";
import "../../Styles/Pages/Cart.css";
import { motion } from "framer-motion";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { foodItemAddedToCart } = useSelector((state) => state.cart);
  const { signUpData } = useSelector((state) => state.auth);
  const { successfulPaymentToken } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const handleIncreaseQuantity = (foodItemName) => {
    const item = foodItemAddedToCart.find((item) => item.foodItemName === foodItemName);
    dispatch(updateFoodItemQuantity({ foodItemName, quantity: item.quantity + 1 }));
  };

  const handleDecreaseQuantity = (foodItemName) => {
    const item = foodItemAddedToCart.find((item) => item.foodItemName === foodItemName);
    if (item.quantity > 1) {
      dispatch(updateFoodItemQuantity({ foodItemName, quantity: item.quantity - 1 }));
    }
  };

  const handleRemoveItem = (foodItemName) => {
    dispatch(removeFoodItemFromCart(foodItemName));
  };

  const totalAmount = Array.isArray(foodItemAddedToCart)
    ? foodItemAddedToCart.reduce((total, item) => total + item.foodItemPrice * item.quantity, 0)
    : 0;

  const tax = totalAmount > 0 ? 0 : 0;
  const grandTotal = totalAmount + tax;

  const paymentHandler = () => {
    if (token) {
      BuyFoodOrder(token, foodItemAddedToCart, signUpData, navigate, dispatch);
    } else {
      console.log("Token is not present");
    }
  };

  return (
    <div className="cartPage">
      <div className="cartBackButton">
        <Link to={"/all-food-items"} style={{ textDecoration: "none", color: "#000000" }}>
          <IoMdArrowRoundBack size={24} />
        </Link>
      </div>

      {Array.isArray(foodItemAddedToCart) && foodItemAddedToCart.length > 0 && successfulPaymentToken === null ? (
        foodItemAddedToCart.map((item) => (
          <div key={item.foodItemName} className="foodItemInCart">
            <div>
              <p>{item.foodItemName}</p>
              <p>
                {item.foodItemPrice.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
              </p>
            </div>
            <div className="totalNumberOfFoodItemAndTotalAmount">
              <div className="totalItem">
                <FaMinus onClick={() => handleDecreaseQuantity(item.foodItemName)} />
                <input type="text" value={item.quantity} readOnly style={{ border: "none", textAlign: "center", maxWidth: "20px" }} />
                <FaPlus onClick={() => handleIncreaseQuantity(item.foodItemName)} />
              </div>
              <div className="oneFoodItemTotalAmount">
                {(item.foodItemPrice * item.quantity).toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                <MdDelete className="deleteItem" size={18} onClick={() => handleRemoveItem(item.foodItemName)} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="yourCartIsEmpty">Your cart is empty.</div>
      )}

      <div className="cartBorderBottom"></div>

      <div className="slip">
        <div className="itemTotal">
          <p>Item total</p>
          <p>{totalAmount.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</p>
        </div>
        <div className="taxAndcharges">
          <p>Tax and Charges</p>
          <p>{tax.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</p>
        </div>
        <div className="grandTotal">
          <p>Grand Total</p>
          <p>{grandTotal.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</p>
        </div>
      </div>

      <div className="cartButtonDiv">
        <button className="cartButton" onClick={() => setShowPaymentPopup(true)}>Proceed To Pay</button>
      </div>
      
      {showPaymentPopup && (
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3 }}
          className="paymentPopup"
        >
          <div className="popupContent">
            <h3>Select Payment Method</h3>
            <button onClick={() => { paymentHandler(); setShowPaymentPopup(false); }}>Online Payment</button>
            <button onClick={() => setShowPaymentPopup(false)}>Cash on Delivery</button>
            <button className="closePopup" onClick={() => setShowPaymentPopup(false)}>Cancel</button>
          </div>
        </motion.div>
      )}
      
      <Bottom />
    </div>
  );
}

export default Cart;
