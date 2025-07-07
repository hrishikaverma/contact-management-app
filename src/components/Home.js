import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/contacts");
      setContacts(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch contacts. Please try again.");
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      getContacts();
    } catch (err) {
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
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.12)",
          borderRadius: "20px",
          padding: "35px 30px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "35px",
            fontWeight: "700",
            fontSize: "2rem",
            letterSpacing: "1.5px",
          }}
        >
          📇 All Contacts
        </h2>

        <Link to="/add" style={{ display: "block", textAlign: "center" }}>
          <button
            style={{
              backgroundColor: "#4e8cff",
              color: "white",
              padding: "12px 28px",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "16px",
              boxShadow: "0 4px 15px rgba(78,140,255,0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#3869e9";
              e.target.style.boxShadow = "0 6px 20px rgba(56,105,233,0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#4e8cff";
              e.target.style.boxShadow = "0 4px 15px rgba(78,140,255,0.4)";
            }}
          >
            + Add New Contact
          </button>
        </Link>

        {loading && (
          <p style={{ textAlign: "center", marginTop: "25px", fontSize: "1.2rem" }}>
            Loading contacts...
          </p>
        )}
        {error && (
          <p
            style={{
              textAlign: "center",
              marginTop: "25px",
              color: "#ff6b6b",
              fontWeight: "600",
              fontSize: "1.1rem",
            }}
          >
            {error}
          </p>
        )}

        <ul style={{ listStyle: "none", padding: 0, marginTop: "25px" }}>
          {contacts.map((contact) => (
            <li
              key={contact._id}
              style={{
                marginBottom: "20px",
                padding: "20px 25px",
                borderRadius: "15px",
                background: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "transform 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong
                  style={{
                    fontSize: "1.25rem",
                    display: "block",
                    marginBottom: "6px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {contact.firstName} {contact.lastName}
                </strong>
                <div
                  style={{
                    fontSize: "0.9rem",
                    opacity: 0.85,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  📧{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    style={{ color: "#a0c8ff", textDecoration: "underline" }}
                  >
                    {contact.email}
                  </a>{" "}
                  | 📞 {contact.phone}
                </div>
              </div>

              <div style={{ marginLeft: "20px", display: "flex", gap: "12px" }}>
                <Link to={`/edit/${contact._id}`}>
                  <button
                    style={{
                      backgroundColor: "#28a745",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "14px",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e7e34")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
                    aria-label={`Edit contact ${contact.firstName} ${contact.lastName}`}
                  >
                    ✏️ Edit
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
                    backgroundColor: "#dc3545",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "14px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#a71d2a")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
                  aria-label={`Delete contact ${contact.firstName} ${contact.lastName}`}
                >
                  🗑️ Delete
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
