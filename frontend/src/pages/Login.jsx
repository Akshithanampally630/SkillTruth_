import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/Login.css";
import "../styles/Signup.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const res = await API.post("/auth/login", form);
    localStorage.setItem("userId", res.data.userId);

    alert(res.data.message);

    navigate("/home");   // redirect

  } catch (err) {

    console.log(err);

    alert(err.response?.data?.message || "Login failed");

  }
};

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit">Login</button>

        </form>

        <p className="switch-text">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;