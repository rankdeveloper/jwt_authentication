const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
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

module.exports ={authenticate}