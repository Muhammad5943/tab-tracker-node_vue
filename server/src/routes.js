const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')

module.exports = (app) => {
    /* Authentication */
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register
    )
    app.post('/login',
        AuthenticationController.login
    )

    /* Song */
    app.get('/songs',
        SongsController.index
    )
    app.post('/songs',
        SongsController.post
    )
}