const crypto = require("crypto")

const smsSID = process.env.SMS_SID
const smsAuthToken = process.env.SMS_AUTH_TOKEN
const fromNumber = process.env.SMS_FROM_NUMBER
const twilio = require("twilio")(smsSID,smsAuthToken,{
    lazyLoading: true
})
const hashService = require("../services/hash-service")


class OTPService {
    async generateOTP() {
        return crypto.randomInt(1000,9999)
    }
    async sendBySMS(phone,otp) {
        try {

            return await twilio.messages.create({
                to: "+91"+phone,
                from: fromNumber,
                body: `After submiting this OTP you will become the part of our family ${otp}`
            })
        }
        catch(e) {
            console.log(e)
        }
    }
    async verifyOTP(hashedOtp,data) {

        let computedHash = await hashService.hashOtp(data)
        console.log("At otp-service.js 27: ",computedHash,hashedOtp)

        return computedHash === hashedOtp
    }

}

module.exports = new OTPService()