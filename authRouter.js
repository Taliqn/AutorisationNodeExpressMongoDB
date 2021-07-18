const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")
const authMiddleware = require('./middleweare/middleweare')
const roleMiddleware = require('./middleweare/roleMiddleware')


router.post('/registration', [ check('username', "name user not empty").notEmpty()],
    check("password", "password min 4 symbol max 10").isLength({min:4, max: 10}),  controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['USER', "ADMIN"]), controller.getUsers)

module.exports = router