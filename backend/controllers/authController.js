const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "secretkey";

exports.signup = async (req, res) => {

  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Password length validation
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name,email,password) VALUES (?,?,?)";

    db.query(sql, [name, email, hashedPassword], (err) => {

      if (err) {

        // duplicate email case
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email already registered" });
        }

        console.log(err);
        return res.status(500).json({ message: "Signup failed" });
      }

      res.json({ message: "Signup successful" });

    });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Error creating user" });

  }

};

exports.login = (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {

    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Wrong password" });
    }

    res.json({
      message: "Login successful",
      
      userId: user.id
      
    });

  });

};