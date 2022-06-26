const otpService = require("../services/otp-service")
const hashService = require("../services/hash-service")
const userService = require("../services/user-service")
const tokenService = require("../services/token-service")
const UserDto = require("../dtos/user-dto")

class ActivateController {
    async activate(req,res) {
        res.json({message: "OK!"})
    }
}

module.exports = new ActivateController()