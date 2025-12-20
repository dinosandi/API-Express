//index.js

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("selamat datang di API!");
});

const productController = require("./product/ProductController");
app.use("/products", productController);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
