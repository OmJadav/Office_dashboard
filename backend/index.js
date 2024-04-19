const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")
dotenv.config()
const mongoose = require("mongoose")
const app = express()

const router = require("./routes/allRoutes")


//middlewares
// app.use(cors())
app.use(express.json())
app.use(router)

//build folder deployment
app.use(express.static(path.join(__dirname, "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})


const port = process.env.PORT
const mongoUrl = process.env.MONGO_URL


mongoose.connect(mongoUrl).then(() => {
    console.log("MongoDb Connected ✅");
}).catch((err) => {
    console.log("MongoDb Failed ❌....", err);
})


app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
})
