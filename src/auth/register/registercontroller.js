const express = require("express");
const router = express.Router();
const { postRegister } = require("./registerservice");

router.post('/register', async (req,res) => {
    try {
        const { username, email, password, noHp } = req.body;
        const phoneNumber = Number(noHp);

        if (!username || !email || !password || !phoneNumber) {
            return res.status(400).send({
                message : "All fields are required"
            })
        }
       
        const newUser = await postRegister(req.body);
        res.status(201).send({
            data: newUser,
            message: "User registered successfully"
        });
    } catch (error) {
        throw error;
        
    }
})

module.exports = router;