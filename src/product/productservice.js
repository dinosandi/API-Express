// layaer untuk sebuah logic 

const prisma = require("../db");

const getAllProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}
const getById = async (id) => {
    const productId = await prisma.product.findUnique({
        where: {
            id: id
        }
    });
    return productId;
    
}
module.exports = {
    getAllProducts,
    getById

}