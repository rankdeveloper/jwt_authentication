const {User} = require('../model/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    console.log("req body : " , req.body)
    const { username, password } = req.body
    // console.log("username : " , username , "password : ",password)

    if (!username || !password) {
       return res.status(400).send({ msg: "username and password are required..." })
    }

    try {
        const hashPassword = await bcrypt.hash(password, 10)
        console.log("hashpassword", hashPassword)
        // users.push({ username, password: hashPassword })
        await User.create({ name:username , password: hashPassword })

       return  res.redirect('/login')
    }
    catch (err) {
       return res.status(500).send({ msg: "Error registering user", error: err })
    }

}


const loginUser = async (req, res) => {
    const { username, password } = req.body
    console.log("login", username, password)
    // console.log("users : ", users)

    // const user = users.find(u => u.username == username)
    const user = await User.findOne({name:username})
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

    const token = jwt.sign({ name: user.name }, 'secretKey', { expiresIn: '1h' })
    res.cookie('token', token, { httpOnly: true })
    // return res.send({ token })
    return res.redirect('/protected')
}

module.exports={register , loginUser}