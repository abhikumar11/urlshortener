const express = require("express");
const routers = express.Router();
routers.use("/",require("./user"));
routers.use("/web",require("./web"));

module.exports = routers;