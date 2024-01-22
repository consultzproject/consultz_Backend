module.exports = function () {
    var contactDao = require('../../dao/admin/contactDao.js')
    require("../../utils/common.js")()

    require('dotenv').config()
    var contactDaooObject = new contactDao()


    this.addContactService = (userData) => {

        return new Promise(async function (resolve) {
          var response = {};
          try {
            var sendMail = await this.sendEmail(userData);
            if (sendMail === "Sent") {
              var contactData = await contactDaooObject.addContactDao(userData);
              if (contactData.error == false) {
                response.error = false;
                response.status = "success";
                response.message = "Submitted Successfully ..!";
               
                resolve(response);
              } else {
                response.error = true;
                response.status = "failure";
                response.message = "Submission Failed";
                resolve(response);
              }
            } 
            else{
                response.error = true;
                response.status = "failure";
                response.message = "Creation Failed";
                resolve(response);
            }
          } catch (error) {
            console.log(error);
            response.error = true;
            response.status = "failure";
            response.message = "OOPS Service Error";
            resolve(response);
          }
        });
      };

  
    
}