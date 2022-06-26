const router = require("express").Router()
const authController = require("../controllers/auth-controller")
const activateController = require("../controllers/activate-controller")

router.post("/send-otp",authController.sendOtp)
router.post("/verify-otp",authController.verifyOtp)
router.post("/activate",activateController.activate)

module.exports = router