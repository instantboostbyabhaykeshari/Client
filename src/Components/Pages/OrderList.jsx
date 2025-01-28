import React, { useEffect, useState } from 'react';
import sellerImage from "/images/Delivery.png";
import { useDispatch, useSelector } from 'react-redux';
import Bottom from '../bottom';
import apiConnector from "../../Services/apiConnector.js";
import toast from 'react-hot-toast';
import { setLoading } from "../../Slices/authSlice.js";
import "../../Styles/Pages/OrderList.css";

function OrderList() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchAllOrders = async () => {
            dispatch(setLoading(true)); // Start loading
            try {
                const response = await apiConnector("GET", "https://backend-fygl.onrender.com/api/v1/order/getAllOrders");

                if (!response?.data) {
                    toast.error("Error in fetching order details.");
                    dispatch(setLoading(false)); // Stop loading on error
                    return;
                }

                console.log("All Orders details: ", response);
                setOrders(response?.data?.allOrder || []);
            } catch (err) {
                console.log(err);
                toast.error("Error in fetching all orders details.");
            } finally {
                dispatch(setLoading(false)); // Always stop loading
            }
        };

        fetchAllOrders();
    }, [dispatch]);

    // Return loader if loading is true
    if (loading) {
        return (
            <div className="orderListLoadingDiv">
                <div className="orderListLoading"></div>
            </div>
        );
    }

    return (
        <div className="order-list-container">
            <h1>All Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div className="order-card" key={order._id}>
                        <div className="order-header">
                            <img src={order?.user?.userProfilePicture || sellerImage} alt="User" className="user-profile-picture" />
                            <div>
                                <h2>{order?.user?.userName}</h2>
                                <p>Email: {order?.user?.userEmail}</p>
                                <p>Phone: {order?.user?.userPhoneNumber}</p>
                            </div>
                        </div>
                        <div className="order-details">
                            <h3>Order Details:</h3>
                            <ul>
                                {order?.items?.map((item) => (
                                    <li key={item._id}>
                                        {item.foodItem} - {item.quantity} x ₹{item.price}
                                    </li>
                                ))}
                            </ul>
                            <p><strong>Total Amount:</strong> {order.totalAmount.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</p>
                            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                        </div>
                        <div className="shipping-details">
                            <h3>Shipping Address:</h3>
                            <p>
                                {order?.shippingAddress?.street}, {order?.shippingAddress?.city}, {order?.shippingAddress?.state}, {order?.shippingAddress?.zipCode}, {order?.shippingAddress?.country}
                            </p>
                            <p>
                                <strong>Order Time:</strong>{" "}
                                {new Date(order.createdAt).toLocaleString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                })}
                            </p>
                        </div>
                    </div>
                ))
            )}
            <Bottom />
        </div>
    );
}

export default OrderList;
