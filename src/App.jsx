import React from "react";
import { useEffect, useState } from "react";
import Profile from "./Components/profile";
import Splash from "./Components/splash";
import WebApp from "./Components/webApp";
import Login from "./Components/login";
import { Route, Routes, Navigate } from "react-router-dom";
import OtpVerificationPage from "./Components/otpVerificationPage";
import { useSelector } from "react-redux";
import FoodCard from "./Components/core/Food-Card";
import Cart from "./Components/Pages/Cart";
import AllFoodItems from "./Components/Pages/All-Food-Items";
import Order from "./Components/Pages/Order";
import Bookmark from "./Components/Pages/Bookmark";
import OrderList from "./Components/Pages/OrderList";
import Address from "./Components/Pages/Address";
import ContactUs from "./Components/Pages/ContactUs";
import Settings from "./Components/Pages/Settings";
import HelpFAQ from "./Components/Pages/HelpFAQ";
import ProfileDetails from "./Components/Pages/ProfileDetails";
import { requestNotificationPermission } from "./firebase.js"
import "./App.css";

function App() {
  let [splashScreen, setSplashScreen] = useState(true);
  const {signUpData} = useSelector((state)=>state.auth);

  useEffect(() => {
    setTimeout(() => {
      setSplashScreen(false);
    }, 2000);
  }, []);

  const { token } = useSelector((state) => state.auth);
  //const token = localStorage.removeItem();
  // console.log(token);


  //FireBase
  useEffect(() => {
    requestNotificationPermission()
      .then((token) => {
        if (token) {
          fetch("http://localhost:5000/api/admin/save-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
        }
        console.log("Abhay")
      });
  }, []);

  return (
    <div>
      {splashScreen ? (
        <Splash />
      ) : (
        <Routes>
          {token !== null ? (
            signUpData.email === "sudhanshumodan7890@gmail.com" ? (<Route path="/order-list" element={<OrderList/>}></Route>) : (<Route path="/home" element={<WebApp />}></Route>)
          ) : (
            <Route path="/login" element={<Login />}></Route>
          )}
           <Route
            path="/"
            element={token ? (signUpData.email === "sudhanshumodan7890@gmail.com" ? <Navigate to="/order-list" replace/> : <Navigate to="/home" replace />) : <Navigate to="/login" replace />}
          />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/verification" element={<OtpVerificationPage />}></Route>
          <Route path="/card" element={<FoodCard />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/order" element={<Order />}></Route>
          <Route path="/all-food-items" element={<AllFoodItems />}></Route>
          <Route path="/bookmark" element={<Bookmark/>}></Route>
          <Route path="/profile-details" element={<ProfileDetails />} />
          <Route path="/address" element={<Address />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpFAQ />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
