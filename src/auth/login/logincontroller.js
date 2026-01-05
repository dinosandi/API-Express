const express = require("express");
const router = express.Router();
const { loginUser } = require("./loginservice");

// auth.controller.js
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const result = await loginUser(email, password);
  
      res.status(200).json({
        data: result,
        message: "Login success"
      });
    } catch (error) {
      res.status(401).json({ 
        message: "Login failed",
        error: error.message
       });
    }
  });
  

module.exports = router;