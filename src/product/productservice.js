// service layer bertujuan untuk handle bussiness logic
// kenapa di pisah? karena memiliki tangguang jawab yang berbeda
// reusability, maintainability, testability

const prisma = require("../db");
const { findProducts, findProductsById } = require("./productrepository");


const getAllProducts = async () => {
    const products = await findProducts();
    return products;
}
const getById = async (id) => {
    const productId = await findProductsById(id);
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