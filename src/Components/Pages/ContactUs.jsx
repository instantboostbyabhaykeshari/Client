import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiConnector from "../../Services/apiConnector";
import toast from "react-hot-toast";
import Bottom from "../bottom";

const styles = {
  formContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    paddingBottom: `85px`, 
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#4faf5a",
    marginBottom: "20px",
  },
  formRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  formGroup: {
    flex: 1,
    marginBottom: "20px",
  },
  formLabel: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#333",
  },
  formInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  formTextarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
    minHeight: "100px",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
  },
  submitButton: {
    width: "100%",
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
  disabledButton: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
};

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    try {
      setLoading(true);
      await apiConnector("POST", "/api/v1/contact-us", data);
      setLoading(false);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
      toast.success("Form Submitted Successfully");
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Contact the Developer</h2>
      <p style={{ textAlign: "center", marginBottom: "20px", color: "#555" }}>
        Have any questions or need assistance? Fill out the form below to reach
        out to the developer, and we’ll get back to you as soon as possible!
      </p>
      <form onSubmit={handleSubmit(submitContactForm)}>
        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label htmlFor="firstname" style={styles.formLabel}>
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              placeholder="Enter first name"
              style={styles.formInput}
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <span style={styles.errorMessage}>Please enter your name.</span>
            )}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="lastname" style={styles.formLabel}>
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              placeholder="Enter last name"
              style={styles.formInput}
              {...register("lastname")}
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.formLabel}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email address"
            style={styles.formInput}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span style={styles.errorMessage}>
              Please enter your Email address.
            </span>
          )}
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="phonenumber" style={styles.formLabel}>
            Phone Number
          </label>
          <input
            type="number"
            id="phonenumber"
            placeholder="12345 67890"
            style={styles.formInput}
            {...register("phoneNo", {
              required: {
                value: true,
                message: "Please enter your Phone Number.",
              },
              maxLength: { value: 12, message: "Invalid Phone Number" },
              minLength: { value: 10, message: "Invalid Phone Number" },
            })}
          />
          {errors.phoneNo && (
            <span style={styles.errorMessage}>{errors.phoneNo.message}</span>
          )}
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="message" style={styles.formLabel}>
            Message
          </label>
          <textarea
            id="message"
            placeholder="Enter your message here"
            style={styles.formTextarea}
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span style={styles.errorMessage}>Please enter your Message.</span>
          )}
        </div>

        <button
          disabled={loading}
          type="submit"
          style={{
            ...styles.submitButton,
            ...(loading ? styles.disabledButton : {}),
          }}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
      <Bottom/>
    </div>
  );
};

export default ContactUsForm;
