const {Router} = require('express')
const router = Router()
const bcrypt = require("bcryptjs")
const config = require("config");
const validator = require('express-validator')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')

// /api/auth/register
router.post('/register', validator.check('email', 'Некорректный Email').isEmail(), validator.check("password", "Некорректный пароль").isLength({min: 6}), async (req, res) => {
    try {
        console.log('Body: ' + req.body)
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: "Некорректные данные при регистрации"})
        }
        const {login, email, password} = req.body
        const candidate = await User.findOne({ login: login })
        if (candidate) {
          return res.status(400).json({ message: 'Такой пользователь уже существует' })
        }
        const hash = await bcrypt.hash(password, 12)
        const user = new User({login: login, password: hash, email: email}) 
        await user.save()
        res.status(201).json({message: "Пользователь создан"})
    } catch(e){
        res.status(500).json({message: "Что-то пошло не так, ошибка: " + e})
    }
})
router.post('/login', [validator.check("password", "Некорректный пароль").exists()], async (req, res) => {
    try {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: "Некорректные данные при авторизации"})
        }
        const {login, password} = req.body
        const user = await User.findOne({ login: login})
        if(!user){
            return res.status(400).json({ message: "Пользователь не найден"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ message: "Неправильный пароль"})
        }
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
            )
            res.json({ token, userId: user.id })
    } catch(e){
        res.status(500).json({message: "Что-то пошло не так, ошибка: " + e})
    }
})

module.exports = router;