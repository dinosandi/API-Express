const { PostLogin } = require("./loginrepository");

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await PostLogin(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  return {
    id: user.id,
    email: user.email
  };
};

module.exports = { loginUser };
