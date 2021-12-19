const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only image", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserImage = upload.single("image");


exports.callUpload = async (req, res) => {
  try {
    // aws s3 upload

    // console.log(req.file)

    if (!req.file) return next();
    req.body.image = `user-${Date.now()}-post.jpg`;
    let params = {
      Bucket: "sdp3jobber",
      Key: req.body.image,
      Body: req.file.buffer,
    };
    await sharp(req.file.buffer)
      .resize(2000, 1333)
      .toFormat("jpg").jpeg({ quality: 90 })
      .toBuffer()
      .then((buffer) => {
        params.Body = buffer;
        params.Key = req.body.image;
        s3.upload(params, (error, data) => {
          if (error) {
            console.log(error);
          }

          res.status(200).json({
            status: 200,
            message: "Success",
            publicUrl: data.Location,
            filename: data.Key,
          });
        });
      });


  } catch (e) {
    console.log(e);
  }
};
