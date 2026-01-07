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

const loginController = require("./auth/login/logincontroller");
app.use("/auth", loginController);

const registerController = require("./auth/register/registercontroller");
app.use("/auth", registerController);

const useGetUserController = require ("./auth/useGetUser/useGetUserController");
app.use("/auth", useGetUserController);

const categoryController = require("./category/categorycontroller");
app.use("/products/", categoryController);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
