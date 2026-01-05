const { insertUser} = require('./registerrepository');
const postRegister = async (newUserData) => {
    const user = await insertUser(newUserData);
    return user;
}

module.exports = {
    postRegister
}