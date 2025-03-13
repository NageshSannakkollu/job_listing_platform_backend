const express = require("express")
const cors = require("cors")
const app = express()
const userRoutesDetails = require("./routes/userRoutes")
const jobRoutesDetails = require("./routes/jobRoutes")

app.use(cors())
app.use(express.json())

app.use("/",userRoutesDetails)
app.use("/",jobRoutesDetails)


const port = 3025 || process.env.PORT;

app.listen(port,(() => {
    console.log(`Server Running at: http://localhost:${port}/`)
}))