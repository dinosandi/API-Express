const express = require("express");
const router = express.Router();
const {getAllUsers,getUserById} =  require("./useGetUserService");

router.get("/users", async (req,res) => {
    const users = await getAllUsers();
    res.status(200).send({
        data: users,
        message:"Successfully retrieved all users "
    })
})

router.get("/users/:id", async (req,res) => {
    const userId = req.params.id;
    const userData = await getUserById(userId);
    res.status(200).send({
        data: userData,
        message: "Successfully retrieved user"
    })
    re
})

module.exports = router;


