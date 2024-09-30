const express = require("express");
const { signup , login , getAllUsers, getUserProfile, updateUserProfile } = require("../controller/user");
const updateMiddleware = require("../middleware/updateMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/getUsers", getAllUsers);
router.get("/getUserProfile",getUserProfile);
router.put("/updateUserProfile", updateMiddleware , updateUserProfile);

module.exports = router;