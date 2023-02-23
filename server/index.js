const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { dbConnect } = require("./config/dbConnection");
const error = require("./middlewares/error");
const user = require("./routes/userRoute");

const app = express();

app.use(express.json());


app.use("/api/", user);

app.use(error);

dotenv.config();

const connectServer = () => {
  dbConnect(process.env.MONGO_URL);
  app.listen(process.env.PORT, () => {
    console.log("connected to server on port " + process.env.PORT);
  });
};

connectServer();
