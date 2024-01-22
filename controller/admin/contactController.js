module.exports = function () {
    var contactService = require('../../services/admin/contactServices')
    var contactServiceObject = new contactService()

    this.addContactController = async (req, callback) => {
        var response = {}
        var contactController = await contactServiceObject.addContactService(req)
        if (contactController.error == true) {
            response.error = true
            response.status = contactController.status
            response.message = contactController.message
            response.result = contactController.result
        } else {
            response.error = false
            response.status = contactController.status
            response.message = contactController.message
            response.token = contactController.token
        }
        callback(response)
    }
  
  
}