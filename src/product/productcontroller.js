// layer (file) untuk handel req dan res
// dan juga handel sebuah validasi 

const express = require("express");
const router = express.Router();
const prisma = require("../db");
const {getAllProducts,getById,createProduct,deletedProductById,patchProductById} = require ("./productservice");

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
    try {
        const { name, imageUrl, description, price } = req.body;
        const priceNumber = Number(price);

        // VALIDASI SEMUA FIELD WAJIB DIISI
        if (
            !name ||
            !imageUrl ||
            !description ||
            isNaN(priceNumber)
          ) {
            return res.status(400).json({
              message: "Invalid input data"
            });
          }          

        const product = await createProduct(req.body);

        res.status(201).json({
            data: product,
            message: "Successfully created product"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create product",
            error: error.message
        });
    }
});

  
router.delete('/:id', async (req,res) => {
    try {
        const productId = req.params.id;
        const deleteProduct = await deletedProductById (productId);
        res.status(200).send ({
            message: "Successfully deleted product"
        })
        return deleteProduct;
        
    } catch (error) {
        res.status(404).json ({
            message: ('Product not found')
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
  
