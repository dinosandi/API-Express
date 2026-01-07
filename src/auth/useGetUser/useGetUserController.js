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

router.get("/users/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const userData = await getUserById(userId);
  
      if (!userData) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
  
      const responseData = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        noHp: userData.noHp,
        role: userData.role
      };
  
      return res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: responseData
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });
  
  

module.exports = router;


