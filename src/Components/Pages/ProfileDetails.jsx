import React, { useState, useEffect } from "react";
import Bottom from "../bottom";
import LocationSelector from "../LocationSelector";
import { useSelector } from "react-redux";
import "../../Styles/Pages/ProfileDetails.css";

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
        <p style={{fontSize: "14px"}}>
          <strong>Name:</strong> {signUpData?.name}
        </p>
        <p style={{fontSize: "10px"}}>
          <strong>Email:</strong> {signUpData?.email}
        </p>
        <p style={{fontSize: "14px"}}>
          <strong>Phone:</strong> {signUpData?.mobileNo || "9870667515"}
        </p>
      </div>

      <div style={styles.infoSection}>
        <h3 style={styles.sectionHeading}>Delivery Address</h3>
        <textarea className="profileDetailsTextarea"
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
    width: "100vw",
    display: "flex",
    flexDirection: "column"
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "1rem 0 0.4rem 0",
    color:"rgb(79, 175, 90)"
  },
  subHeading: {
    fontSize: "16px",
    textAlign: "center",
    color: "#666",
    marginBottom: "20px",
  },
  infoSection: {
    width: "90vw",
    margin: "1rem auto",
    padding: "10px",
    backgroundColor: "#EEF7EF",
    borderRadius: "8px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 4px"
  },
  sectionHeading: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#333",
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px",
    textAlign: "center"
  },
  textarea: {
    width: "100%",
    height: "80px",
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