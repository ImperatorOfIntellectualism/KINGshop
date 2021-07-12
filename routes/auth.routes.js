const {Router} = require('express')
const router = Router()
const bcrypt = require("bcryptjs")
const config = require("config");
const validator = require('express-validator')
const User = require('../models/User.js')
const Item = require('../models/Item.js')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

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
            res.json({ token, userId: user.id, userName: user.login })
    } catch(e){
        res.status(500).json({message: "Что-то пошло не так, ошибка: " + e})
    }
})
router.post('/getitems', async (req, res) => {
    try {
        const data = await Item.find()
        res.json(data)
    } catch (error) {
        
    }
})
router.post('/getitem', async (req, res) => {
    try {
        const data = await Item.findOne({name: req.body.name})
        res.json(data)
    } catch (error) {
        
    }
})
router.post('/buy', async (req, res) => {
        User
    .findOneAndUpdate({
      login: req.body.userName
    },{
      $addToSet: {cart: req.body.id}
    })
    .then((user) => console.log(user.login))
    .catch((error) => {
      console.log(error);
    });
});
router.post('/getcart', async (req, res) => {
    await User.findOne({login: req.body.userName}).then(async (user) => {
        let items = []
        for(i = 0; i < user.cart.length; i++){
        await Item.find({_id: user.cart[i]}).then((cartitem) => {
            items.push(cartitem)
        })
    }
        res.json(items)
    })
})
router.post('/getcartid', async (req, res) => {
    await User.findOne({login: req.body.userName}).then(async (user) => {
        res.json(user.cart)
    })
})
router.post('/handler', async (req, res) => {
    Item
    .find({ name: { $regex: req.body.name, $options: "i" } })
    .limit(5)
    .then((name) => {
      let list = "<ul>";
      for (i = 0; i < name.length; i++) {
        list =
          list +
          `<li onclick="fill('${name[i].name}')"><a>${name[i].name}</a></li>`;
      }
      list = list + "</ul>";
      res.json(list);
    });
})
router.post("/deleteitem", async (req, res) => {
    console.log(req.body.userName)
    console.log(typeof req.body.item)
    User
    .findOneAndUpdate({
      login: req.body.userName
    },{
      $pull: {cart: req.body.item}
    })
    .then((user) => console.log(user.login))
    .catch((error) => {
      console.log(error);
    });
})
router.post('/sendmail', async (req, res) => {
    const data = JSON.stringify(req.body.data) + " " + JSON.stringify(req.body.quantity) + " Total: " + JSON.stringify(req.body.total) + " " + req.body.name
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'bachuganchikomania2@gmail.com', // generated ethereal user
            pass: '15042001sd%SD'  // generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
      });
    
      // setup email data with unicode symbols
      let mailOptions = {
          from: '"KINGshop" <bachuganchikomania2@gmail.com>', // sender address
          to: 'bachuganchikomania2@gmail.com', // list of receivers
          subject: 'KINGshop', // Subject line
          text: data, // plain text body
          //html: //data // ${data}
      };
    
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);   
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
})
module.exports = router;