import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import {removeFoodItemFromCart, updateFoodItemQuantity} from "../../Slices/cartSlice";
import { IoMdArrowRoundBack } from "react-icons/io";
import Bottom from "../bottom";
import {motion} from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {BuyFoodOrder} from "../../Services/CustomerAPI.js";
import "../../Styles/Pages/Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { foodItemAddedToCart } = useSelector((state) => state.cart);
  const { signUpData } = useSelector((state) => state.auth);
  const { successfulPaymentToken } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  console.log("Payment token: ", successfulPaymentToken);
  console.log("Food Item Added to cart: ", foodItemAddedToCart);

  const handleIncreaseQuantity = (foodItemName) => {
    const item = foodItemAddedToCart.find(
      (item) => item.foodItemName === foodItemName
    );
    dispatch(
      updateFoodItemQuantity({ foodItemName, quantity: item.quantity + 1 })
    );
  };

  const handleDecreaseQuantity = (foodItemName) => {
    const item = foodItemAddedToCart.find(
      (item) => item.foodItemName === foodItemName
    );
    if (item.quantity > 1) {
      dispatch(
        updateFoodItemQuantity({ foodItemName, quantity: item.quantity - 1 })
      );
    }
  };

  const handleRemoveItem = (foodItemName) => {
    dispatch(removeFoodItemFromCart(foodItemName));
  };

  const totalAmount = Array.isArray(foodItemAddedToCart)
    ? foodItemAddedToCart.reduce(
        (total, item) => total + item.foodItemPrice * item.quantity,
        0
      )
    : 0;

  const tax = totalAmount > 0 ? 0 : 0;
  const grandTotal = totalAmount + tax;

      // console.log("Cart SignUp Data: ",signUpData);

  //Payment handler
  const {token} = useSelector((state)=> state.auth);
  console.log("Cart token: ", token);
  const paymentHandler = () => {
    if(token){
      BuyFoodOrder(token, foodItemAddedToCart, signUpData, navigate, dispatch);
    }
    else{
      console.log("Token is not present");
    }
  }

  //Animated button 
  

  return (
    <div className="cartPage">
        <div className="cartBackButton"><Link to={"/all-food-items"} style={{textDecoration: "none", color: "#000000"}}><IoMdArrowRoundBack size={24} /></Link></div>

      {Array.isArray(foodItemAddedToCart) && foodItemAddedToCart.length > 0 && successfulPaymentToken === null ? (
        foodItemAddedToCart.map((item) => (
          <div key={item.foodItemName} className="foodItemInCart">
            <div>
              <p>{item.foodItemName}</p>
              <p>
                {item.foodItemPrice.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>
            </div>
            <div className="totalNumberOfFoodItemAndTotalAmount">
              <div className="totalItem">
                <FaMinus
                  onClick={() => handleDecreaseQuantity(item.foodItemName)}
                />
                <input
                  type="text"
                  value={item.quantity}
                  readOnly
                  style={{
                    border: "none",
                    textAlign: "center",
                    maxWidth: "20px",
                  }}
                />
                <FaPlus
                  onClick={() => handleIncreaseQuantity(item.foodItemName)}
                />
              </div>
              <div className="oneFoodItemTotalAmount">
                {(item.foodItemPrice * item.quantity).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
                <MdDelete
                  className="deleteItem"
                  size={18}
                  onClick={() => handleRemoveItem(item.foodItemName)}
                />
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
          <p>
            {totalAmount.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>
        <div className="taxAndcharges">
          <p>Tax and Charges</p>
          <p>
            {tax.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>
        <div className="grandTotal">
          <p>Grand Total</p>
          <p>
            {grandTotal.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>
      </div>

      <div className="cartButtonDiv">
        <button className="cartButton " onClick={() => setIsOpen(!isOpen)}>Proceed To Pay</button>
      </div>

      <Bottom/>
      <motion.div
        initial={{ y: 100, visibility: "none" }}
        animate={isOpen ? { y: 0, visibility: "visible" } : { y: 100, visibility: "none" }}
        transition={{ type: "spring", stiffness: 100 }}
        className="payment-container"
        >
        <div className="paymentMethods">
          <div className="cashOnDelivery"><p>Cash on Delivery</p></div>
          <div className="online" onClick={paymentHandler}><p>Online</p></div>
          <div className="paymentCancelButton" onClick={() => setIsOpen(!isOpen)}><p>Cancel</p></div>
        </div>
      </motion.div>
    </div>
  );
}

export default Cart;
