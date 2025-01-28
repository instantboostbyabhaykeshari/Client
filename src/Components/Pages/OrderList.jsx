import React, { useEffect, useState } from 'react';
import sellerImage from "/images/Delivery.png"
import { useSelector } from 'react-redux';
import Bottom from '../bottom';
import apiConnector from "../../Services/apiConnector.js";
import toast from 'react-hot-toast';
import "../../Styles/Pages/OrderList.css";

function OrderList() {
    const {signUpData} = useSelector((state)=>state.auth);
    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        const fetchAllOrders = async() => {
            try{
                const response = await apiConnector("GET", "https://backend-fygl.onrender.com/api/v1/order/getAllOrders");

                if(!response?.data){
                    toast.error("Error in fetching order details.");
                }

                console.log("All Orders details: ", response);
                //Set User details
                console.log("User details: ", response?.data?.allOrder?.map((order)=>order.user);
                setUserDetails(response?.data?.allOrder?.map((order)=>order.user));

            }catch(err){
                console.log(err);
                console.log("Error in fetching all orders details.");
            }
        }

        fetchAllOrders();
    }, []);

  return (
    <div>
      <div className='sellerImageDiv'>
        <img className='sellerImage' src={sellerImage} alt="Seller-Image" />
      </div>
      <div className='sellerInfo'>
        <p className='sellername'>Sudhanshu Modanwaal</p>
        <p className='sellerEmail'>{signUpData.email}</p>
        <p className='sellerMobileNo'>{signUpData.mobileNo}</p>
      </div>
      <Bottom/>
    </div>
  )
}

export default OrderList;
