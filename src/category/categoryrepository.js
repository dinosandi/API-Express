const prisma = require('../db');

const createCategory = async (data) => {
    const category = await prisma.category.create({
        data : {
            name: data.name
        },
    });
    return category;
}


module.exports = {
    createCategory
}