const express = require('express')
const mongoose = require('mongoose')
const authRouter = require("./authRouter")
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://qwerty:555qwerty@cluster0.dopvo.mongodb.net/AutorisationNodeExpressMongoDB?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`start on port ${PORT}`))
    }   catch (e) {
        console.log(e)
    }
}

start()