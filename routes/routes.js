const express = require("express");
const {
  createUserController,
  loginUserController,
} = require("../controllers/createUserController");
const { getUserData } = require("../controllers/getUserData");
const router = express.Router();
router.route("/create").post(createUserController);
router.route("/login").get(loginUserController);
router.route("/details").get(getUserData);
module.exports = router;
