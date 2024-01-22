module.exports = function () {
    var authDao = require('../../dao/admin/authDao')
    require("../../utils/common.js")()

    require('dotenv').config()
    var authDaoObject = new authDao()

    this.addAuthService = (userData) => {
        return new Promise(async function (resolve) {
          var response = {};
          var resp = {};
          try {
            var checkUserData = await authDaoObject.checkAdminEmail(userData);
            if (checkUserData.data.length > 0) {
              response.error = true;
              response.status = "failure";
              response.message = "Email Already Exists!";
              var genToken = {};
              genToken.id = checkUserData.data[0].id;
              genToken.email = checkUserData.data[0].email;
              
              var tokendata = await this.generateToken(genToken);
              resp.token = Buffer.from(tokendata).toString("base64");
              response.token = resp.token;
              response.result = checkUserData.result;
              resolve(response);
            } else {
              var passwordHash = this.generatePasswordHash(userData.password);
              userData.password = passwordHash;
              var registerUserData = await authDaoObject.addAuthDao(userData);

              if (registerUserData.error == false) {
                var checkUserRegistered = await authDaoObject.checkAdminEmail(
                  userData
                );

                var genToken = {};
                genToken.id = checkUserRegistered.data[0].id;
                genToken.email = checkUserRegistered.data[0].email;
              
                response.error = false;
                response.status = "success";
                response.message = "Registered Successfully ..!";
                var tokendata = await this.generateToken(genToken);
                resp.token = Buffer.from(tokendata).toString("base64");
                response.token = resp.token;
                resolve(response);
              } else {
                response.error = true;
                response.status = "failure";
                response.message = "Registration Failed";
                resolve(response);
              }
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
   
  
    this.getAuthService = (userData) => {
        console.log(userData)

        return new Promise(async function (resolve) {
          var response = {};
          var resp = {};
          try {
            var checkUserLogin = await authDaoObject.checkAdminEmail(userData);
            if (checkUserLogin.data.length == 0) {
              response.error = true;
              response.status = "failure";
              response.message = "Invalid Login !";
              resolve(response);
            } else {
              var passwordHash = this.spiltPasswordHash(
                checkUserLogin.data[0].password
              );
              var hash = this.reGeneratePasswordHash(
                userData.password,
                passwordHash.salt
              );
              if (hash === passwordHash.hash) {
                var genToken = {};
                genToken.id = checkUserLogin.data[0].id;
                genToken.email = checkUserLogin.data[0].email;
                
                response.error = false;
                response.status = "success";
                response.message = "Login Successful!";
             
                var token = await this.generateToken(genToken);
                resp.token = Buffer.from(token).toString("base64");
                response.token = resp.token;
                resolve(response);
              } else {
                response.error = true;
                response.status = "failure";
                response.message = "Invalid Password ..!";
                resolve(response);
              }
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