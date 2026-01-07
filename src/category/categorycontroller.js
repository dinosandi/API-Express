const express = require("express");
const router = express.Router();
const { insertCategory } = require("./categoryservice")

router.post("/category", async (req, res) => {
    try {
      const category = await insertCategory(req.body);
      res.status(201).json({
        data: category,
        message: "Category created"
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

module.exports = router;

