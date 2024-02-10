module.exports = function(){
    var jwt = require('jsonwebtoken')
    var crypto = require("crypto")
    const nodemailer = require('nodemailer')
    require('dotenv').config()


    this.makeUniqueID = (length)=>{
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
         }
         return result;
      }

      this.generatePasswordHash = function(password) {
        // return new Promise(function(resolve) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
        var hpassword = salt + "$" + hash;
        return (hpassword)
        // })
    }
    this.reGeneratePasswordHash = function(password, salt) {
      let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
      return (hash)
  }

  this.spiltPasswordHash = function(passwordHash) {
      var resp = {}
      var passwordFields = passwordHash.split('$');
      resp.salt = passwordFields[0];
      resp.hash = passwordFields[1];
      return (resp)
      // })
  }
    /** ACCESS TOKEN METHODS */
    this.generateToken = function(data) {
      return new Promise(function(resolve) {
          jwt.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY_TIME }, (err, token) => {
              if (err) {
                  resolve(err)
              } else {
                  resolve(token)
              }
          })
      })
  }

    this.getDataFromToken = function(token,secret){
        var result = {}
        return new Promise(function(resolve){
            jwt.verify(token,secret,(err,payload)=>{
                if(err){
                    result.error = true
                    result.data = null
                    resolve(result)
                }else{
                    result.error = false
                    result.data = payload
                    resolve(result)
                }
            })
        })
    }
    this.sendEmail = function(data) {
        return new Promise(function(resolve) {
            var transporter = nodemailer.createTransport({
                host: process.env.SMTP_SERVER,
                port: process.env.SMTP_PORT,
                secure: process.env.SMTP_SECURE,
               
                tls: {
                    rejectUnauthorized: false
                },
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            })

            // var text = `email: ${data.email} name: ${data.name} Password: ${data.doctorPassword} App Login URL : ${process.env.DOCTOR_PANEL_URL}`
            

            var mailOptions = {
                from: process.env.SMTP_FROM,
                to: process.env.SMTP_USER,
                subject: "Contact Form",
                text:`
                name:${data.name} 
                email:${data.email} 
                mobile:${data.mobile} 
                message:${data.message} `,
                

              
                // html: doctorEmaiTemplate
            }


            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log('Email Not sent: ' + error)
                    resolve(error)
                } else {
                    console.log('Email sent: ' + info.response)
                    resolve("Sent")
                }
            })
        })
    }
   
 
    this.sendResume = function(data) {
        return new Promise(function(resolve) {
            var transporter = nodemailer.createTransport({
                host: process.env.SMTP_SERVER,
                port: process.env.SMTP_PORT,
                secure: process.env.SMTP_SECURE,
               
                tls: {
                    rejectUnauthorized: false
                },
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            })

            // var text = `email: ${data.email} name: ${data.name} Password: ${data.doctorPassword} App Login URL : ${process.env.DOCTOR_PANEL_URL}`
            

            var mailOptions = {
                from: process.env.SMTP_FROM,
                to: process.env.SMTP_USER,
                subject: "Contact Form",
                text:`
                name:${data.name} 
                email:${data.email} 
                mobile:${data.mobile} 
                designation:${data.designation} 
                resume_url:${data.resume_url} `,
                

              
                // html: doctorEmaiTemplate
            }


            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log('Email Not sent: ' + error)
                    resolve(error)
                } else {
                    console.log('Email sent: ' + info.response)
                    resolve("Sent")
                }
            })
        })
    }
}