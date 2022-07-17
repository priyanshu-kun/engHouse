const router = require("express").Router()
const authController = require("../controllers/auth-controller")
const activateController = require("../controllers/activate-controller")
const isAuth = require("../middlewares/isAuth")
const roomsController = require("../controllers/rooms-controller")

router.post("/send-otp",authController.sendOtp)
router.post("/verify-otp",authController.verifyOtp)
router.post("/activate",isAuth,activateController.activate)
router.get('/refresh', authController.refresh)
router.post('/logout',isAuth, authController.logout);
router.post('/rooms',isAuth, roomsController.create);
router.get('/rooms',isAuth, roomsController.index);
router.get('/rooms/:roomId',isAuth, roomsController.show);

module.exports = router