import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    const { email, password } = formData;
    if (!email || !password) {
      return handleError("❌ All fields are required");
    }
    if (password.length < 6) {
      return handleError("❌ Password must be at least 6 characters long");
    }
    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        const token = data.token;
        localStorage.setItem("token", token); // Store token in localStorage
        handleSuccess(data.msg || "Login successful!");
        setMessage(`✅ ${data.msg || "Login successful!"}`);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(data.msg || "Login failed");
        setMessage(`❌ ${data.msg || "Login failed"}`);
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <div
      className="login-container"
      style={{ padding: 20, maxWidth: 400, margin: "0 auto" }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}

      <ToastContainer />
    </div>
  );
}
