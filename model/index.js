const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/jwt_user')
    .then(() => {
        console.log("Mongodb is connected...")
    })
    .catch((err) => {
        console.log("Mongodb is not connected ", err)
    })

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = { User }