const {
    Bookmark,
    Song
} = require('../models')
const _ = require('lodash')

module.exports = {
    async index (req, res) {
        try {
            const userId = req.user.id
            const { songId/* , userId (used it before implement jwt-passport)*/ } = req.query
            /* console.log(req.query);
            console.log(req.query);
            console.log(req.query); */
            const where = {
                UserId: userId
            }
            if (songId) {
                where.SongId = songId
            }

            const bookmarks = await Bookmark.findAll({
                // after fixing
                where: where,
                include: [
                    {
                        model: Song
                    }
                ]
                // before fix
                /* where: {
                    // SongId: songId, // this the issue
                    UserId: userId
                } */
            })
                /* .map(bookmark => bookmark.toJSON)
                .map(bookmark => _.extend(
                    {},
                    bookmark.Song,
                    bookmark
                )) */

            res.send(bookmarks)
            } catch (err) {
                res.status(500).send({
                    error: 'an error has occured trying to fetch the bookmark'
                })
            }
    },

    async post (req, res) {
        try {
            const userId = req.user.id
            const { /* userId,  */songId } = req.body
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

            const newBookmark = await Bookmark.create({
                SongId: songId,
                UserId: userId
            })

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
            const userId = req.user.id
            const { bookmarkId } = req.params

            const bookmark = await Bookmark.findOne({
                where: {
                    id: bookmarkId,
                    UserId: userId
                }
            })
            if (!bookmark) {
                return res.status(403).send({
                    error: 'you do not access to this bookmark'
                })
            }
            await bookmark.destroy()
            res.send(bookmark)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to delete bookmark'
            })
        }
    }
}
