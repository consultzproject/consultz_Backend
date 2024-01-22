module.exports = function () {
    var resumeDao = require('../../dao/admin/resumeDao.js')
    require("../../utils/common.js")()

    require('dotenv').config()
    var resumeDaoObject = new resumeDao()


    this.addResumeService = (userData) => {

        return new Promise(async function (resolve) {
          var response = {};
          try {
            var sendMail = await this.sendResume(userData);
            if (sendMail === "Sent") {
              var resumeData = await resumeDaoObject.addResumeDao(userData);
              if (resumeData.error == false) {
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

      this.getResumeService = (userData) => {
        return new Promise(async function (resolve) {
          var response = {};
          try {
          
              var resumeData = await resumeDaoObject.getResumeDao(userData);
              if (resumeData.error == false) {
                response.error = false;
                response.status = "success";
                response.data = resumeData.data
               
                resolve(response);
              } else {
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
  
      this.getResumeFilterService = (userData) => {
        return new Promise(async function (resolve) {
          var response = {};
          try {
          
              var resumeData = await resumeDaoObject.getResumeFilterDao(userData);
              if (resumeData.error == false) {
                response.error = false;
                response.status = "success";
                response.data = resumeData.data
               
                resolve(response);
              } else {
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