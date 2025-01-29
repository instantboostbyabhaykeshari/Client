import React, { useState, useEffect } from "react";
import Bottom from "../bottom";
import LocationSelector from "../LocationSelector";
import { useSelector } from "react-redux";

const ProfileDetails = () => {
  const [address, setAddress] = useState("");

  const {signUpData} =useSelector((state)=>state.auth);

  useEffect(() => {
    const savedAddress = localStorage.getItem("deliveryAddress");
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("deliveryAddress", address);
  }, [address]);

  const handleLocationSelect = (location) => {
    setAddress(location);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Profile</h1>
      <p style={styles.subHeading}>Welcome to your profile page!</p>

      <div style={styles.infoSection}>
        <h3 style={styles.sectionHeading}>Profile Details</h3>
        <p>
          <strong>Name:</strong> {signUpData?.name}
        </p>
        <p>
          <strong>Email:</strong> {signUpData?.email}
        </p>
        <p>
          <strong>Phone:</strong> {signUpData?.mobileNo || "9870667515"}
        </p>
      </div>

      <div style={styles.infoSection}>
        <h3 style={styles.sectionHeading}>Delivery Address</h3>
        <textarea
          style={styles.textarea}
          value={address}
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Enter your delivery address"
        />
        <LocationSelector onLocationSelect={handleLocationSelect} />
        {address && (
          <p style={styles.deliveryAddress}>
            <strong>Delivery Address:</strong> {address}
          </p>
        )}
      </div>
      <Bottom />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
    color:"#4faf5a",
  },
  subHeading: {
    fontSize: "16px",
    textAlign: "center",
    color: "#666",
    marginBottom: "20px",
  },
  infoSection: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  sectionHeading: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#333",
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    fontSize: "14px",
    resize: "none",
  },
  deliveryAddress: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#333",
    backgroundColor: "#f1f1f1",
    padding: "10px",
    borderRadius: "8px",
  },
};

export default ProfileDetails;