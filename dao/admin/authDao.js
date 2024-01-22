module.exports = function () {
    var authModal = require("../../modal/admin/authModal.js");
  
    this.addAuthDao = async (data) => {
        var response = {};
        return new Promise(function (resolve, reject) {
          const authModals = new authModal(data);
          authModals.save(function (error, result) {
            if (error) {
              response.error = true;
            } else {
              response.error = false;
              response.data = result;
            }
            resolve(response);
          });
        });
      };
 
  
    this.checkAdminEmail = async (data) => {
      var response = {};
      return new Promise(function (resolve, reject) {
        authModal.find({ email: data.email }, function (error, result) {
          if (error) {
            response.error = true;
          } else {
            response.error = false;
            response.data = result;
          }
          resolve(response);
        });
      });
    };
  
    this.getAuthDao = async (data) => {
        console.log
      var response = {};
      return new Promise(function (resolve, reject) {
        authModal.find(
          { email: data.email, password: data.password },
          function (error, result) {
            if (error) {
              response.error = true;
            } else {
              response.error = false;
              response.data = result;
            }
            resolve(response);
          }
        );
      });
    };
  };
  