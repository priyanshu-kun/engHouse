const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    phone: {type: String,required: true},
    name: {type: String, required: false},
    username: {type: String, required: false},
    avatar: {type: String, required: false, get: (avatar) => {
        return `${process.env.BASE_URL}${avatar}`
    }},
    activated: {type: Boolean,required: false,default: false}
},{
    timestamps: true,
    toJSON: {getters: true}
})

module.exports = mongoose.model('User',userSchema,'users')