import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import "../styles/Signup.css";

function Signup() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const res = await API.post("/auth/signup", form);

    alert(res.data.message);

  } catch (err) {

    alert(err.response.data.message);

  }
};

  return (
    <div className="signup-page">

      <div className="signup-card">

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
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

          <button type="submit">Signup</button>

        </form>

        <p className="switch-text">
          Already have an account? <Link to="/">Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;