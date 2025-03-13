const express = require("express")
const {jobRegistration,getAllJobsList, getJobBySpecificId,deleteJobBySpecificId,updateJobQuery} = require("../controller/jobController")
const authenticateToken = require("../middleware/authMiddleware")
const { updateJobById } = require("../models/jobModels")
const router = express.Router()

router.post("/api/jobs",jobRegistration)
router.get("/api/jobs",getAllJobsList)
router.get("/api/jobs/:id",getJobBySpecificId)
router.delete("/api/jobs/:id",deleteJobBySpecificId)
router.put("/api/jobs/:id",updateJobQuery)

module.exports = router;