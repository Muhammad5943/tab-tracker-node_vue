const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const port = process.env.PORT || 8081
const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

sequelize.sync(/* {force: true} */)
    .then(() => {
        app.listen(config.port, () => { 
            console.log(`Server run on port http://localhost:${config.port} 🔥`)
        })
    })