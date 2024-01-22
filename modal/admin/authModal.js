const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const authSchema = new Schema({


    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
  

})

const authModal = mongoose.model('admin', authSchema)
module.exports = authModal