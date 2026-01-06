const prisma = require("../../db");

const findUser = async () => {
    const users = await prisma.user.findMany()
    return users;
}

const findUserById = async (id) => { 
    const userId = await prisma.user.findUnique({
        where: {
            id:id
        }
    })
    return userId;
}

module.exports = {
    findUser,
    findUserById
}