const express = require("express");
const { signup , login , getAllUsers } = require("../controller/user");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/getUsers", getAllUsers);

module.exports = router;