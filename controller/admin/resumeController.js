module.exports = function () {
    var resumeService = require('../../services/admin/resumeServices')
    var resumeServiceObject = new resumeService()

    this.addResumeController = async (req, callback) => {
        var response = {}
        var resumeController = await resumeServiceObject.addResumeService(req)
        if (resumeController.error == true) {
            response.error = true
            response.status = resumeController.status
            response.message = resumeController.message
            response.result = resumeController.result
        } else {
            response.error = false
            response.status = resumeController.status
            response.message = resumeController.message
            response.token = resumeController.token
        }
        callback(response)
    }
  
    this.getResumeController = async (req, callback) => {
        var response = {}
        var resumeController = await resumeServiceObject.getResumeService(req)
        if (resumeController.error == true) {
            response.error = true
            response.status = "failure"
            response.message = resumeController.message
        } else {
            response.error = false
            response.status = "success"
            response.message = resumeController.message
            response.data = resumeController.data
          }
        callback(response)
    }
    this.getResumeFilterController = async (req, callback) => {
        var response = {}
        var resumeController = await resumeServiceObject.getResumeFilterService(req)
        if (resumeController.error == true) {
            response.error = true
            response.status = "failure"
            response.message = resumeController.message
        } else {
            response.error = false
            response.status = "success"
            response.message = resumeController.message
            response.data = resumeController.data
          }
        callback(response)
    }
}