require("dotenv").config()
const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const cors = require("cors")
const { errorMiddleware } = require("./middleware/errorMiddleware")

const app = express()

const PORT = process.env.PORT || 8000

// Conntect  to Database
mongoose.connect(
  process.env.MONGO_URL,
  () => {
    console.log("Connected to DB...")
  },
  (e) => {
    console.error(e)
  }
)

// EXPRESS JSON HANDLER
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use("/api/users", require("./routes/users"))
app.use("/api/todos", require("./routes/todos"))
app.use("/api/lists", require("./routes/lists"))

// Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  )
} else {
  app.get("/", (req, res) => res.send("Please set to production"))
}

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log("Server started on port " + PORT + "...")
})
