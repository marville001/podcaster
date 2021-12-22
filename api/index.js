const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const config = require("config");

const app = express();
const db = config.get("db");

//Connect to mongodb
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."));

// Middlewares
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use("/static", express.static("public"));

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Listenning at port ${port}`);
});
