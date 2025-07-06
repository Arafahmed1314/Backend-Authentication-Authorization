import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    console.log(username);
    if (!username || !email || !password) {
      return handleError("❌ All fields are required");
    }
    if (password.length < 6) {
      return handleError("❌ Password must be at least 6 characters long");
    }
    try {
      const res = await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        handleSuccess(data.msg || "Signup successful!");
        setMessage(`✅ ${data.msg || "Signup successful!"}`);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(data.msg || "Signup failed");
        setMessage(`❌ ${data.msg || "Signup failed"}`);
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <div
      className="signup-container"
      style={{ padding: 20, maxWidth: 400, margin: "0 auto" }}
    >
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}

      <ToastContainer />
    </div>
  );
}
