const otpService = require("../services/otp-service")
const hashService = require("../services/hash-service")
const userService = require("../services/user-service")
const tokenService = require("../services/token-service")
const UserDto = require("../dtos/user-dto")
const Jimp = require('jimp')
const path = require('path')

class ActivateController {
    async activate(req,res) {
        const {name,avatar,username} = req.body;
        if(!name || !avatar || !username) {
            return  res.status(400).json({message: "All fields are required!"});
        }
        const buffer = Buffer.from(avatar.replace(/^data:image\/(png|jpg|jpeg|gif|svg);base64,/,''),'base64')
        const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`
        try {
            const jimpRes = await Jimp.read(buffer)
            jimpRes.resize(150,Jimp.AUTO).write(path.resolve(__dirname,`../storage/${imagePath}`));
        }
        catch(e) {
            return  res.status(500).json({message: "Could not process the image!"});
        }

        const userId =  req.user._id;
      
        try {
            const user = await userService.findUser({_id: userId})
            if(!user) {
                return req.status(404).json({message: "User not found!"})
            }
            user.activated = true;
            user.name = name;
            user.username = username;
            user.avatar = `/storage/${imagePath}`
            user.save()
            return res.send({user: new UserDto(user),auth: true})
        }
        catch(e) {
            return  res.status(500).json({message: "Something went wrong while saving user!"});
        }

    }
}

module.exports = new ActivateController()