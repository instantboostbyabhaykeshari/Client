import React from 'react';
import sellerImage from "/images/Delivery.png"
import { useSelector } from 'react-redux';
import "../../Styles/Pages/OrderList.css";

function OrderList() {
    const {signUpData} = useSelector()
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
    </div>
  )
}

export default OrderList;
