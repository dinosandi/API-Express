const prisma = require('../../db');

const insertUser = async (newUserData) => {
    const allowedRoles = ['USER', 'ADMIN'];
    const role = allowedRoles.includes(newUserData.role) ? newUserData.role : 'USER';
    const user = await prisma.user.create({
        data: {
            email: newUserData.email,
            password: newUserData.password,
            username: newUserData.username,
            noHp : Number(newUserData.noHp),
            role: role
        }
    })
    return user;
}

module.exports = {
    insertUser
}