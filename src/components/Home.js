import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all contacts
  const getContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/contacts");
      setContacts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching contacts:", err.message);
      setError("Failed to fetch contacts. Please try again.");
      setLoading(false);
    }
  };

  // Delete contact and refresh list
  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      getContacts();
    } catch (err) {
      console.error("Error deleting contact:", err.message);
      setError("Failed to delete contact.");
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/bg.jpg')", // Use your bg.jpg from public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "16px",
          padding: "30px 25px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)", // For Safari
          border: "1px solid rgba(255, 255, 255, 0.18)",
          color: "#222",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#fff" }}>
          📇 All Contacts
        </h2>

        <Link to="/add">
          <button
            style={{
              backgroundColor: "#007BFF",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "25px",
              boxShadow: "0 3px 8px rgba(0,123,255,0.5)",
              fontWeight: "600",
              fontSize: "16px",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            Add New Contact
          </button>
        </Link>

        {loading && <p style={{ textAlign: "center", color: "#fff" }}>Loading contacts...</p>}
        {error && (
          <p
            style={{
              color: "#ff6b6b",
              textAlign: "center",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            {error}
          </p>
        )}

        <ul style={{ listStyle: "none", padding: 0 }}>
          {contacts.map((contact) => (
            <li
              key={contact._id}
              style={{
                marginBottom: "18px",
                padding: "15px 20px",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                backgroundColor: "rgba(255,255,255,0.25)",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                fontSize: "16px",
                color: "#222",
              }}
            >
              <strong style={{ fontSize: "18px" }}>
                {contact.firstName} {contact.lastName}
              </strong>

              <span>
                📧{" "}
                <a href={`mailto:${contact.email}`} style={{ color: "#007BFF" }}>
                  {contact.email}
                </a>{" "}
                | 📞 {contact.phone}
              </span>

              <div style={{ marginTop: "10px" }}>
                <Link to={`/edit/${contact._id}`}>
                  <button
                    style={{
                      marginRight: "12px",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "#28a745",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e7e34")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
                  >
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to delete contact: ${contact.firstName} ${contact.lastName}?`
                      )
                    ) {
                      deleteContact(contact._id);
                    }
                  }}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#dc3545",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#a71d2a")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
