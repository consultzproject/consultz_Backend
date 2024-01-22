module.exports = function () {
    var contactModal = require("../../modal/admin/contactModal.js");
  
    this.addContactDao = async (data) => {
      var response = {};
      return new Promise(function (resolve, reject) {
        const contactModals = new contactModal(data);
        contactModals.save(function (error, result) {
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
  
   
  
   
  };
  