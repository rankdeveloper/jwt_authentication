const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const users = []
router.get('/', (req, res) => {
    console.log(req.ip)
    res.render('Register')
})

const showUsers = (req, res, next) => {
    console.log("Total ", users)
    next();
}



router.post('/register', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400).send({ msg: "username and password are required..." })
    }

    try {
        const hashPassword = await bcrypt.hash(username, 10)
        console.log("hashpassword", hashPassword)
        users.push({ username, password: hashPassword })
        res.redirect('/login')
    }
    catch (err) {
        res.status(500).send({ msg: "Error registering user", error: err })
    }

})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', showUsers, async (req, res) => {
    const { username, password } = req.body
    console.log("login", username, password)
    console.log("users : ", users)

    const user = users.find(u => u.username == username)
    console.log("user ", user)
    if (!user) {
        return res.status(400).send({ msg: "Invalid credentials" })
    }
    console.log("compare sync", await bcrypt.compareSync(password, user.password))
    const isValidPassword = await bcrypt.compare(password, user.password)
    console.log("isValidPassword : ", isValidPassword)
    if (!isValidPassword) {
        return res.status(400).send({ msg: "Invalid credentials" })
    }

    const token = jwt.sign({ username: user.username }, 'secretKey', { expiresIn: '1h' })
    res.cookie('token', token, { httpOnly: true })
    // return res.send({ token })
    res.redirect('/protected')
})


const authentcateJWT = (req, res, next) => {
    const token = req.cookies.token
    if (token) {
        jwt.verify(token, 'secretKey', (err, user) => {
            if (err) res.status(403)

            req.user = user
            next()
        })
    }
    else {
        res.status(400).send("Dont have token")
    }
}


router.get('/protected', showUsers, authentcateJWT, (req, res) => {
    let count = req.
        res.send({ msg: "This is protected route", user: req.user })
})

module.exports = router;