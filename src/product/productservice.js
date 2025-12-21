// layaer untuk sebuah logic 

const prisma = require("../db");

const getAllProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}
const getById = async (id) => {

    if(!id){
        throw new Error ("Product ID is required");
    }
    const productId = await prisma.product.findUnique({
        where: {
            id: id
        }
    });
    return productId;
    
}

const createProduct = async (newProdactData) => {
    const product = await prisma.product.create({
        data: {
            name: newProdactData.name,
            imageUrl: newProdactData.imageUrl,
            description: newProdactData.description,
            price: newProdactData.price
        }
      })
   return product;
}

module.exports = {
    getAllProducts,
    getById,
    createProduct,
}