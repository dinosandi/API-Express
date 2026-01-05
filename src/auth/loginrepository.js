const prisma = require("../db");

const PostLogin = async (email) => {
    const Login = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return Login;
}
module.exports = {
    PostLogin
}