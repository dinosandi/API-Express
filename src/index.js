const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api", (req, res) => {
  res.send("selamat datang di API!");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
