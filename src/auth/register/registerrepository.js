const prisma = require('../../db');

const insertUser = async (newUserData) => {
    const user = await prisma.user.create({
        data: {
            email: newUserData.email,
            password: newUserData.password,
            username: newUserData.username,
            noHp : Number(newUserData.noHp)
        }
    })
    return user;
}

module.exports = {
    insertUser
}