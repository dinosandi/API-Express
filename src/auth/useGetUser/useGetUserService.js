const {findUser,findUserById} = require("./useGetUserRepository");


const getAllUsers = async () => {
    const users = await findUser()
    return users
}

const getUserById = async (id) => {
    const userId = await findUserById(id);
    return userId;
}


module.exports = {
    getAllUsers,
    getUserById
}