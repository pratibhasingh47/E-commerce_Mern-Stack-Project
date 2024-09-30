const express = require("express");
const { signup , login , getAllUsers, getUserProfile, updateUserProfile } = require("../controller/user");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/getUsers", getAllUsers);
router.get("/getUserProfile",getUserProfile);
router.put("/updateUserProfile",updateUserProfile);

module.exports = router;