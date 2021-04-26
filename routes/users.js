var express = require("express");
var router = express.Router();
const checkAuthUser = require("../middlewares/checkAuthUser");
const user = require("../controllers/user");

router.get("/getUserById", checkAuthUser, user.getUserById);
router.post("/login", user.loginUser);
router.post("/createUser", user.createUser);
router.put("/updateUser", checkAuthUser, user.updateUser);

module.exports = router;
