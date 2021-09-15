const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json());

// mongodb
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

const port = process.env.PORT;

const routes = require("./routes");
app.use("/api", routes)

app.listen(port, () => {
    console.log(`Server Started at ${port}`);
})