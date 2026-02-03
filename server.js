const express = require("express");
const cors = require("cors");
require("dotenv").config();

const todoRoutes = require("./routes/todo.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080 🚀");
});
