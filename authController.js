const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { validationResult } = require("express-validator")
const {secret} = require("./config")


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, )
}

class authController {
    async registration(reg, res) {
    try {
        const error = validationResult(reg)
        if(!error.isEmpty()) {
            return res.status(400).json({message: "Error on registration", error})
        }
        const {username, password} = reg.body
        const candidate = await User.findOne({username})
        if(candidate) {
            return res.status(400).json({message: "Пользователь с таким именем уже существует"})
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({value: "USER"})
        const user = new User({username, password: hashPassword, roles: [userRole.value]})
        await user.save()
        return res.json({message: "Пользователь был успешно зарегестрирован"})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Registration error'})
    }
    }
    async login(reg, res) {
    try {
        const {username, password} = reg.body
        const user = await User.findOne({username})
        if (!user) {
            return res.status(400).json({message: `User ${username} not found`})
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword) {
            return res.status(400).json({message: `password error`})
        }
        const token = generateAccessToken(user._id, user.roles)
        return res.json({token})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Login error'})
    }
    }
    async getUsers(reg, res) {
        try {
           const users = await User.find()
            res.json(users)
        } catch (e) {
    }

    }
}

module.exports = new authController()