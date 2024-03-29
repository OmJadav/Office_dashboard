const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
const app = express()

const router = require("./routes/allRoutes")


//middlewares
app.use(cors())
app.use(express.json())
app.use(router)

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
