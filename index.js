const express = require("express");
const app = express();
const db = require("./databases/database.js")
const userrouter = require("./routes/user.js")
const cookieparser = require("cookie-parser")
const travelrouter = require("./routes/traveler.js")
const {config} = require("dotenv")

const cors = require("cors")

app.use(cookieparser())
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))


config({
    path: "./databases/config.env"
})

app.use("/user",userrouter)
app.use("/travel", travelrouter)

db()


app.get("/",(req,res) => {
    res.send("okay done")
})

app.listen(process.env.port, () => {
    console.log("listening to the port")
})



