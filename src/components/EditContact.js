import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/contacts/${id}`);
        const { firstName, lastName, address, email, phone } = res.data;
        setValue("firstName", firstName);
        setValue("lastName", lastName);
        setValue("address", address);
        setValue("email", email);
        setValue("phone", phone);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load contact data.");
        setLoading(false);
      }
    };
    fetchContact();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:5000/contacts/${id}`, data);
      toast.success("✅ Contact updated successfully!", {
        onClose: () => navigate("/"),
        autoClose: 2000,
      });
    } catch (err) {
      const msg =
        err.response?.data?.error || "❌ Failed to update contact. Try again.";
      toast.error(msg);
    }
  };

  if (loading) {
    return (
      <div style={styles.centeredContainer}>
        <div className="spinner"></div>
        <p style={{ color: "white", marginTop: "10px" }}>Loading contact...</p>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <ToastContainer />
      <div style={styles.formBox}>
        <h2 style={styles.heading}>✏️ Edit Contact</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {[
            { name: "firstName", label: "First Name", required: true },
            { name: "lastName", label: "Last Name", required: true },
            { name: "address", label: "Address", required: false },
            { name: "email", label: "Email", required: true },
            { name: "phone", label: "Phone", required: true },
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

          <button type="submit" style={styles.submitBtn}>
            ✅ Update Contact
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundImage: "url('/edit.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    fontFamily: "'Poppins', sans-serif",
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
  centeredContainer: {
    minHeight: "100vh",
    backgroundImage: "url('/edit.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
  },
};

export default EditContact;
