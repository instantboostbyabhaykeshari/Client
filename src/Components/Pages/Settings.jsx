import React, { useState } from "react";
import toast from "react-hot-toast";  
import Bottom from "../bottom";

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#4faf5a",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  section: {
    padding: "10px 0",
    borderBottom: "1px solid #ddd",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#555",
    marginBottom: "10px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "16px",
    color: "#4faf5a",
  },
  button: {
    padding: "12px",
    backgroundColor: "#4faf5a",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    username:"sanyam",
    email:"jainsanyam@gmail.com",
    notifications: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Updated Settings:", formData);
    toast.success("Settings Saved Successfully!");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Settings</h1>
      <form style={styles.form} onSubmit={handleSave}>
        {/* Profile Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Profile</h2>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

        {/* Preferences Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Preferences</h2>
          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
              />
              Enable Notifications
            </label>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="darkMode"
                checked={formData.darkMode}
                onChange={handleChange}
              />
              Dark Mode
            </label>
          </div>
        </div>

        {/* Save Button */}
        <button type="submit" style={styles.button}>
          Save Settings
        </button>
      </form>
      <Bottom/>
    </div>
  );
};

export default SettingsPage;
