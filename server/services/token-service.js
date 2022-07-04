const jwt = require("jsonwebtoken")
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN
const refreshModal = require("../models/refresh.model")
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload,accessTokenSecret,{
            expiresIn: '1h'
        })
        const refreshToken = jwt.sign(payload,refreshTokenSecret,{
            expiresIn: '1y'
        })
        return {
            accessToken,
            refreshToken
        }
    }

    async storeRefreshToken(token, userId) {
        try {
            await refreshModal.create({
                "refresh": token,
                userId
            })
        }
        catch(e) {
            console.log(e.message)
        }
    }


    async verifyAccessToken(token) {
        return jwt.verify(token,accessTokenSecret);
    }

}

module.exports = new TokenService()