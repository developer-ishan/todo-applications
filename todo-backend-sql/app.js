const express = require("express");

require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

const routes = require("./routes");
app.use("/api",routes);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
