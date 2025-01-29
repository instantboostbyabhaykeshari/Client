import React from "react";
import Bottom from "../bottom";

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#4faf5a",
    marginBottom: "20px",
  },
  details: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
    lineHeight: "1.5",
  },
};

const Address = () => {
  return (
    <div>
      <div style={styles.container}>
        <h1 style={styles.heading}>FoodFun Shop</h1>
        <p style={styles.details}>
          <strong>Owner:</strong> John Smith
        </p>
        <p style={styles.details}>
          <strong>Address:</strong> 123 Main Street, Downtown City, Country 45678
        </p>
        <p style={styles.details}>
          <strong>Phone:</strong> +1 234-567-890
        </p>
        <p style={styles.details}>
          <strong>Email:</strong> support@foodfun.com
        </p>
        <p style={styles.details}>
          Feel free to reach out to us for any inquiries or feedback. We’re
          always happy to assist you!
        </p>
      </div>
      <Bottom />
    </div>
  );
};

export default Address;
