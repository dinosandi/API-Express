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

const deletedProduct = async (id) => {
    try {
        const product = await prisma.product.delete({
            where: {
                id: id,
            }
        });
        
    } catch (error) {
        throw error("Failed to delete product: " + error.message);
    }
};

const patchProductById = async (id, updateData) => {

    await getById(id);

    const productId = await prisma.product.findUnique({
        where: {id},
    });
    if (!productId) {
        throw new Error("Product not found");
    }
   const productUpdate = await prisma.product.update({
    where: {id},
    data: {
        name: updateData.name,
        imageUrl: updateData.imageUrl,
        description: updateData.description,
        price: updateData.price
    }
   });
    return productUpdate;
}

module.exports = {
    getAllProducts,
    getById,
    createProduct,
    deletedProduct,
    patchProductById,
}