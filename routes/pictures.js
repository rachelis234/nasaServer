var express = require("express");
var router = express.Router();
const checkAuthUser = require("../middlewares/checkAuthUser");
const picture = require("../controllers/picture");
const upload=require("../middlewares/upload");

router.get("/getPictureOfDay", checkAuthUser, picture.getPictureOfDay);
router.get("/getAllPictures", checkAuthUser, picture.getAllPictures);
router.get("/getPictureById/:pictureId", checkAuthUser, picture.getPictureById);
router.post("/uploadPicture",upload.single('file') ,checkAuthUser, picture.uploadPicture);

module.exports = router;
