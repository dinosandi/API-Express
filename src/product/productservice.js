// service layer bertujuan untuk handle bussiness logic
// kenapa di pisah? karena memiliki tangguang jawab yang berbeda
// reusability, maintainability, testability

const prisma = require("../db");
const { findProducts, findProductsById, insertProduct, deletedProduct, editProduct } = require("./productrepository");


const getAllProducts = async () => {
    const products = await findProducts();
    return products;
}
const getById = async (id) => {
    const productId = await findProductsById(id);
    return productId;
}

const createProduct = async (newProdactData) => {
    const product = await insertProduct(newProdactData);
    return product;
}

const deletedProductById = async (id) => {
    await getById(id);
    await deletedProduct(id);
};

const editProductById = async (id, updateData) => {
    await getById(id);
    const product = await editProduct(id,updateData);
    return product; 
}

module.exports = {
    getAllProducts,
    getById,
    createProduct,
    deletedProductById,
    editProductById,
}