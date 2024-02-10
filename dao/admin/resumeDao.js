module.exports = function () {
    var resumeModal = require("../../modal/admin/resumeModal.js");
    // const parseDate = (dateString) => {
    //   if (!dateString) return null; // Return null if dateString is undefined or null
    //   const [day, month, year] = dateString.split('-');
    //   return new Date(`${year}-${month}-${day}`);
    // };
  
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
        var filter = {};
        if (data.designation) {
          filter.designation = data.designation;
        }
        if (data.location) {
          filter.location = data.location;
        }
        if (data.fromDate && data.toDate) {
        

          const fromDate = (data.fromDate);
      const toDate = (data.toDate);
          filter.createdDate = { $gte: (fromDate), $lte: (toDate) };
        }
    
        resumeModal.find(filter,
        
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
  