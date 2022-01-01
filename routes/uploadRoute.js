const express = require("express");
const uploadController = require("../controllers/uploadController");
const mailController = require("../controllers/mailController");

const router = express.Router();

router
  .route("/")
  .post(uploadController.uploadUserImage, uploadController.callUpload);

  router.route("/profile")
      .post(uploadController.uploadUserProfileImage, uploadController.callProfileUpload);

  router.route("/resume")
      .post(uploadController.uploadUserResume, uploadController.callResumeUpload);

  router.route("/sendmail").post(mailController.sendEmail)
  
module.exports = router;
