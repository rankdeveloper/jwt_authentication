const express = require('express')
const router = express.Router();
const {register , loginUser} = require('../controllers/index')
const {authenticate} = require('../middleware/authentication')


router.get('/', (req, res) => {
    console.log(req.ip)
    res.render('Register')
})

router.post('/register', register)

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', loginUser)

router.get('/protected',authenticate, (req, res) => {
    let count = req.
        res.send({ msg: "This is protected route", user: req.user })
})

module.exports = router;