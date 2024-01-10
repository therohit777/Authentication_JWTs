const express = require("express");
const routes = express();
const userController = require("../controllers/userController");

routes.post("/login", userController.login);
routes.post("/signup", userController.signup);

module.exports = routes;