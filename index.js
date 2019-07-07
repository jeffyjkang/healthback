require("dotenv").config();
//
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const server = express();
//
const user = require("./api/routes/userRoute");
//
server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
//
server.use("/user", user);
//

server.get("/", (req, res) => {
  res.send("<h1>Server Running<h1>");
});
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log("API running..."));
module.exports = { server };
