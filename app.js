const express = require("express");
const config = require("config");
const app = express();
const mongoose = require("mongoose");
const PORT = config.get("port");

app.use(express.json({extended: true}))
app.use("/api/auth", require("./routes/auth.routes")); // Срабатывает при обращении к адресу (1 аргумент), передаёт методы из аргумента 2

async function start() {
  try {
    await mongoose.connect(config.get("MONGO_URL"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(
      PORT,
      console.log(`The server has been started on port: ${PORT}`)
    );
  } catch (e) {
    console.log(`Server error: ${e}`);
    process.exit(1);
  }
}

start();
