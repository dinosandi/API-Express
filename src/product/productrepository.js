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
        },
        include: {
            products: true,
        }
    })
    return product;
}

const insertProduct = async (newProdactData) => {
    const product = await prisma.product.create({
        data: {
            categoryId: newProdactData.categoryId,
            name: newProdactData.name,
            imageUrl: newProdactData.imageUrl,
            description: newProdactData.description,
            price: newProdactData.price
        }
    });
    return product;
}
const deletedProduct = async (id) => {
    const product = await prisma.product.delete({
        where: {
            id: id,
        }
    });
    return product
}

const editProduct = async (id, updateData) => {
    const product = await prisma.product.update({
        where: {
            id: id,
        },
        data: {
            name: updateData.name,
            imageUrl: updateData.imageUrl,
            description: updateData.description,
            price: updateData.price
        }
    });
    return product;
}


module.exports =    {
    findProducts,
    findProductsById,
    insertProduct,
    deletedProduct,
    editProduct,
}