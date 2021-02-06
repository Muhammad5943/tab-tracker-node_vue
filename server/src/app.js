const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const port = process.env.PORT || 8081

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.post('/register', (req, res) => {
    res.send({
        message: `Hello ${req.body.email} Your user has registered`
    })
})

app.listen(port, () => { 
        console.log(`Server run on port http://localhost:${port} 🔥`)
})