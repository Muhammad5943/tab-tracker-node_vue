const {Bookmark} = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
    async index (req, res) {
        try {
            const { songId, userId } = req.query

            const bookmark = await Bookmark.findOne({
                where: {
                    SongId: songId,
                    UserId: userId
                }
            })

            res.send(bookmark)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the songs'
            })
        }
    }
}