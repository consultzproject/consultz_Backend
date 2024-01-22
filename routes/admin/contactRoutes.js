module.exports = function (app, validator) {
  
    var userPath = "/v1/user";
  
    var contactController = require("../../controller/admin/contactController");
    require("dotenv").config();
    var contactControllerObject = new contactController();
 
  
    app.post( userPath + "/contact",function (request, response) {
      var error = validator.validation(request)
      if (error.array().length) {
          this.requestHandler(error.array(), true, function (message) {
              response.send(message)
          })
      } else {
        contactControllerObject.addContactController(request.body, function (message) {
              return response.send(message)
          })
      }
  })

  };
  