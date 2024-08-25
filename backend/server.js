import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import productRouter from "./routes/productRoute.js"
import userRouter from "./routes/userRoute.js"
import "dotenv/config"

// app config

const app = express()

const port = 4000

//middleware

app.use(express.json())
app.use(cors())

app.use("/images", express.static("uploads"))
app.get("/", (req, res) => {
  res.send("API working")
})

app.use("/api/product", productRouter)

app.use("/api/user", userRouter)

app.listen(port, () => {
  console.log("Server started on http://localhost:" + port)
})

connectDB()
