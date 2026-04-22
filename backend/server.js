require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()

// connect DB
connectDB()

// middleware
app.use(express.json())

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

// routes
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

// health check
app.get("/", (req, res) => {
  res.send("API running")
})

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
)