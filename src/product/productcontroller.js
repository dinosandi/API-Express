// layer (file) untuk handel req dan res
// dan juga handel sebuah validasi 

const express = require("express");

const router = express.Router();
const prisma = require("../db");
const {getAllProducts,getById} = require ("./productservice");

router.get("/", async (req, res) => {
   const products = await getAllProducts();
   
    res.status(200).send({
         data: products,
         message: "Successfully retrieved all products"
    });
  });

router.get("/:id", async (req,res) => {
    const productId = req.params.id;
    const productData = await getById(productId);
    res.status(200).send({
        data: productData,
        message: "Successfully retrieved product"
    });
    console.log("Product Not Found",productData);
})
  
router.post('/', async (req, res) => {
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
  
  router.delete('/:id', async (req,res) => {
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
  
  router.put('/:id', async (req,res) => {
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
module.exports = router;
  
