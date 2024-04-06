module.exports = function (app, validator) {
    const multer = require('multer')
  const path = require('path');
  const fs = require('fs');
  
    var userPath = "/v1/user";
  
    var resumeController = require("../../controller/admin/resumeController");
    require("dotenv").config();
    var resumeControllerObject = new resumeController();

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          // Specify the destination folder for uploaded files
          cb(null, './files');
        },
        filename: function (req, file, cb) {
          // Specify the filename for the uploaded file
          cb(null, file.originalname);
        }
      });
      
      const upload = multer({ storage: storage });
      
      // Handle POST requests to the /upload endpoint
      // app.post( userPath +'/upload', upload.single('file'), function (req, res) {
      //   // Access the uploaded file data in req.file
      //   const uploadedFile = req.file;
      
      //   // Do something with the uploaded file data
      //   console.log('Uploaded File:', uploadedFile);
      
      //   // Send a response to the client
      //   res.send(process.env.IMAGE_UPLOAD_URL + '/' + req.file.filename);
        
      // });
    app.get('/uploads/:filename', function(req, res) {
        const filePath = path.resolve('uploads', req.params.filename);
        console.log(filePath,"filePath")
        if (fs.existsSync(filePath)) {
            return res.sendFile(filePath, (err) => {
              if (err) {
                console.error(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: true, message: 'Internal server error' });
              }
            });
          } else {
            res.status(httpStatus.NOT_FOUND).json({ error: true, message: 'File not found' });
          }
      
    });
 
  
    app.post( userPath + "/resume",function (request, response) {
      var error = validator.validation(request)
      if (error.array().length) {
          this.requestHandler(error.array(), true, function (message) {
              response.send(message)
          })
      } else {
        resumeControllerObject.addResumeController(request.body, function (message) {
              return response.send(message)
          })
      }
  })
  app.get( userPath + "/resume",  function (request, response) {
    var error = validator.validation(request)
    if (error.array().length) {
        this.requestHandler(error.array(), true, function (message) {
            response.send(message)
        })
    } else {
        resumeControllerObject.getResumeController(request.query, function (message) {
            return response.send(message)
        })
    }
  })
  // app.get( userPath + "/filterresume",  function (request, response) {
  //   var error = validator.validation(request)
  //   if (error.array().length) {
  //       this.requestHandler(error.array(), true, function (message) {
  //           response.send(message)
  //       })
  //   } else {
  //       resumeControllerObject.getResumeFilterController(request.body, function (message) {
  //           return response.send(message)
  //       })
  //   }
  // })
  };
  