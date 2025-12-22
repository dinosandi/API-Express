// Berkomunakasi dengan database 
// boleh pake ORM, Boleh pake raw query
// supaya kalo ganti ORM tinggal edit di file ini aja

const prisma = require('../db');

const findProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

const findProductsById = async (id) => {
    const product = await prisma.product.findUnique({
        where:{
            id: id,
        }
    })
    return product;
}

module.exports = {
    findProducts,
    findProductsById,
}