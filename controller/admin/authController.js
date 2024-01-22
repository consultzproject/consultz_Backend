module.exports = function () {
    var authService = require('../../services/admin/authServices')
    var authServiceObject = new authService()

    this.addAdminAuth = async (req, callback) => {
        var response = {}
        var adminAuth = await authServiceObject.addAuthService(req)
        if (adminAuth.error == true) {
            response.error = true
            response.status = adminAuth.status
            response.message = adminAuth.message
            response.token = adminAuth.token
            response.result = adminAuth.result
        } else {
            response.error = false
            response.status = adminAuth.status
            response.message = adminAuth.message
            response.token = adminAuth.token
        }
        callback(response)
    }
    this.getAdminAuth = async (req, callback) => {
        console.log(req)
        var response = {}
        var adminAuth = await authServiceObject.getAuthService(req)
        if (adminAuth.error == true) {
            response.error = true
            response.status = "failure"
            response.message = adminAuth.message
        } else {
            response.error = false
            response.status = "success"
            response.message = adminAuth.message
            response.data = adminAuth.data
            response.token = adminAuth.token
          }
        callback(response)
    }
}