const { createCategory } = require("./categoryrepository");

const insertCategory = async (name) => {
    const category = await createCategory(name);
    return category;
}
module.exports = {
    insertCategory
}

