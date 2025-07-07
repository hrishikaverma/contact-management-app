import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AddContact() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/contacts", data);
      toast.success("✅ Contact added successfully!");
      reset();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      const msg =
        err.response?.data?.error || "❌ Something went wrong while adding contact.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <ToastContainer />
      {loading && <div className="spinner" style={styles.spinner}></div>}

      <div style={styles.formBox}>
        <h2 style={styles.heading}>📇 Add Contact</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {[
            { label: "First Name", name: "firstName", required: true },
            { label: "Last Name", name: "lastName", required: true },
            { label: "Address", name: "address", required: false },
          ].map((field) => (
            <div key={field.name} style={{ marginBottom: "20px" }}>
              <label htmlFor={field.name} style={styles.label}>
                {field.label}
                {field.required && <span style={{ color: "#ff6b6b" }}> *</span>}
              </label>
              <input
                id={field.name}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                {...register(field.name, { required: field.required })}
                style={{
                  ...styles.input,
                  borderColor: errors[field.name] ? "red" : "#ccc",
                }}
              />
              {errors[field.name] && (
                <p style={styles.errorText}>This field is required</p>
              )}
            </div>
          ))}

          {/* Email */}
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="email" style={styles.label}>
              Email<span style={{ color: "#ff6b6b" }}> *</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              style={{
                ...styles.input,
                borderColor: errors.email ? "red" : "#ccc",
              }}
            />
            {errors.email && (
              <p style={styles.errorText}>{errors.email.message || "Email is required"}</p>
            )}
          </div>

          {/* Phone */}
          <div style={{ marginBottom: "25px" }}>
            <label htmlFor="phone" style={styles.label}>
              Phone (with country code)<span style={{ color: "#ff6b6b" }}> *</span>
            </label>
            <input
              id="phone"
              placeholder="e.g. +919876543210"
              {...register("phone", {
                required: true,
                pattern: {
                  value: /^\+[1-9]\d{9,14}$/,
                  message: "Phone must start with country code (e.g. +91...)",
                },
              })}
              style={{
                ...styles.input,
                borderColor: errors.phone ? "red" : "#ccc",
              }}
            />
            {errors.phone && (
              <p style={styles.errorText}>{errors.phone.message || "Phone is required"}</p>
            )}
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            ➕ Add Contact
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundImage: "url('/add.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
  },
  formBox: {
    width: "100%",
    maxWidth: "500px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "35px 30px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
    color: "#fff",
    zIndex: 2,
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontWeight: "700",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "2px solid #ccc",
    fontSize: "15px",
    color: "#222",
    outline: "none",
  },
  submitBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    backgroundColor: "#4e8cff",
    border: "none",
    color: "#fff",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(78,140,255,0.4)",
  },
  errorText: {
    color: "#ff4d4d",
    fontSize: "13px",
    marginTop: "4px",
  },
  spinner: {
    position: "absolute",
    top: "20px",
    right: "20px",
    border: "4px solid rgba(255, 255, 255, 0.3)",
    borderTopColor: "white",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    animation: "spin 0.8s linear infinite",
    zIndex: 3,
  },
};

export default AddContact;
