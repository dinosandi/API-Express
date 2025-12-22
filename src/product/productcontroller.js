// layer (file) untuk handel req dan res
// dan juga handel sebuah validasi 

const express = require("express");
const router = express.Router();
const prisma = require("../db");
const {getAllProducts,getById,createProduct,deletedProduct,patchProductById} = require ("./productservice");

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
})
  
router.post('/', async (req, res) => {
    console.log("Body",req.body);
    try {
        const ProductData = req.body;
        const product = await createProduct(ProductData);
        res.status(200).send ({
            data: product,
            message: "Successfully created product"
        });
    } catch (error) {
        res.status(400).send ({
            message: ('Failed to create product')
        });
        
    }
});
  
router.delete('/:id', async (req,res) => {
    try {
        const productId = req.params.id;
        const deleteProduct = await deletedProduct (productId);
        res.status(200).send ({
            data: deleteProduct,
            message: "Successfully deleted product"
        })
        
    } catch (error) {
        res.status(400).send ({
            message: ('Failed to delete product')
        });
        
    }
  });
  
  router.patch('/:id', async (req,res) => {
    try {
        const productId = req.params.id;
        const updateProductData = req.body;
        const updateProduct = await patchProductById(productId, updateProductData);
        res.status(200).json({
            data: updateProduct,
            message: "Successfully updated product",
          });
    } catch (error) {
        res.status(404).send(error.message);
    }
  })
router.put('/:id', async (req,res) => {
    const productId = req.params.id;
    const productData = req.body;
    if(!(
        productData.name &&
        productData.imageUrl &&
        productData.description &&
        productData.price
    )){
        return res.status(400).send ({
            message: ('Failed to update product')
        });
    }
    const product =  await patchProductById(productId, productData);
    res.status(200).send ({
        data: product,
        message: "Successfully updated product"
    });
  });

module.exports = router;
  
