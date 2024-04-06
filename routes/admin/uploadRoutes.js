module.exports = function (app, validator) {
const AWS = require('aws-sdk');
require('dotenv').config()
var userPath = "/v1/user";
  
var resumeController = require("../../controller/admin/resumeController");
var resumeControllerObject = new resumeController();

AWS.config.update({
  accessKeyId:process.env.ACCESS_KEY,
  secretAccessKey:process.env.SECRET_KEY,
  region:process.env.BUCKET_REGION,
});

const s3 = new AWS.S3();
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
});

app.post(userPath +'/upload', upload.single('file'), (req, res) => {
    const params = {
      Bucket:process.env.BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
    };
  
    s3.upload(params, (err, data) => {
      console.log(data,"check data")
      if (err) {
        console.error(err);
        return res.status(500).send('Error uploading file');
      }
  
      res.send(data.Location);
    });
  });
};