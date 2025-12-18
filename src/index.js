const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const req = require("express/lib/request");
const res = require("express/lib/response");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get("/api", (req, res) => {
  res.send("selamat datang di API!");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.send({
    data:{
        products
    }
  });
});

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.send(users);
});

app.post('/products', async (req, res) => {
    const newProdactData = req.body;
    const product = await prisma.product.create({
        data: {
            name: newProdactData.name,
            imageUrl: newProdactData.imageUrl,
            description: newProdactData.description,
            price: newProdactData.price
        }
    })
    res.status(200).send({
        data: product,
        message:"Successfully added new product"
    });
});

app.delete('/products/:id', async (req,res) => {
    const productId = req.params.id;
    await prisma.product.delete ({
        where: {
            id: productId
        }
    });
    res.status(200).send ({
        message: "Successfully deleted product"
    });
    console.log("Successfully deleted product");
});

app.put('/products/:id', async (req,res) => {
    const editProductId = req.params.id;
    const productData = req.body;
    const updateProduct = await prisma.product.update ({
        where: {
            id: editProductId
        },
        data: {
            name: productData.name,
            imageUrl: productData.imageUrl,
            description: productData.description,
            price: productData.price
        }
    })
    res.status(200).send ({
        data: updateProduct,
        message: "Successfully updated product"
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(Object.keys(prisma));

});
