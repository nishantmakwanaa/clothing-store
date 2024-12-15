const express = require("express");
const app = express();
const cors = require("cors");
const products = require("./data/data.json");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Is Running");
});

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Is Running On : http://localhost:${PORT}`);
});