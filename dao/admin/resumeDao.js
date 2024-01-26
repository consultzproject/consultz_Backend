module.exports = function () {
    var resumeModal = require("../../modal/admin/resumeModal.js");
  
    this.addResumeDao = async (data) => {
      var response = {};
      return new Promise(function (resolve, reject) {
        const resumeModals = new resumeModal(data);
        resumeModals.save(function (error, result) {
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
  
    this.getResumeDao = async (data) => {
      var response = {};
      return new Promise(function (resolve, reject) {
        resumeModal.find(!data.designation?{}:{designation:data.designation},
        
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
  
    // this.getResumeFilterDao = async (data) => {
    //   var response = {};
    //   return new Promise(function (resolve, reject) {
    //     resumeModal.find(!data.designation?{}:{designation:data.designation},
        
    //       function (error, result) {
    //         if (error) {
    //           response.error = true;
    //         } else {
    //           response.error = false;
    //           response.data = result;
    //         }
    //         resolve(response);
    //       }
    //     );
    //   });
    // };
  };
  