const express = require("express")
const {userRegistration,loginUser,profileDetails, deleteSpecificUser, retrieveAllUsers} = require("../controller/userController")
const authenticateToken = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/api/auth/signup",userRegistration)
router.post("/api/auth/login",loginUser)
router.get("/api/auth/profile",authenticateToken,profileDetails)
router.delete("/api/auth/delete",authenticateToken,deleteSpecificUser)
router.get("/api/all-users",retrieveAllUsers)

module.exports = router;