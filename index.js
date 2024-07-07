const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./routes/index')
const app = express()


app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/' , router)



app.listen(1000, () => {
    console.log("Server is lisetening on port : 1000...")
})



