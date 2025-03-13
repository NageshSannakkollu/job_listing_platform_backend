const express = require("express")
const {userRegistration,loginUser,profileDetails} = require("../controller/userController")
const authenticateToken = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/api/auth/signup",userRegistration)
router.post("/api/auth/login",loginUser)
router.get("/api/auth/profile",authenticateToken,profileDetails)

module.exports = router;