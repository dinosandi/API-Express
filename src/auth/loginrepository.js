const prisma = require("../db");

const PostLogin = async (id) => {
    const Login = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return Login;
}
module.exports = {
    PostLogin
}