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
                error: 'an error has occured trying to fetch the bookmark'
            })
        }
    },

    async post (req, res) {
        try {
            const { userId, songId } = req.body
            const bookmark = await Bookmark.findOne({
                where: {
                    SongId: songId,
                    UserId: userId
                }
            })
            
            if (bookmark) {
                return res.status(400).send({
                    error: 'you already have this set as a bookmark'
                })
            }

            const newBookmark = await Bookmark.create(req.body)

            res.send(newBookmark)
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: 'an error has occured trying to created bookmark'
            })
        }
    },

    async delete (req, res) {
        try {
            const { bookmarkId } = req.params

            const bookmark = await Bookmark.findByPk(bookmarkId)
            await bookmark.destroy()
            res.send(bookmark)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to delete bookmark'
            })
        }
    }
}
