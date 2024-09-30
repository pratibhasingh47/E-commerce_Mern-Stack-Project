const express = require("express");
const { signup , login , getAllUsers, getUserProfile, updateUserProfile } = require("../controller/user");
const authMiddleware = require("../middleware/updateMiddleware")

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/getUsers", getAllUsers);
router.get("/getUserProfile", authMiddleware,getUserProfile);
router.put("/updateUserProfile", authMiddleware , updateUserProfile);

module.exports = router;