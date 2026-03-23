const express = require("express");
const cors = require("cors");
const db = require("./config/db.js");


const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});