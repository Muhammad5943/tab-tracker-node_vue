const {
    History,
    Song
} = require('../models')
const _ = require('lodash')

module.exports = {
    async index (req, res) {
        try {
            const { userId } = req.query
            const histories = await History.findAll({
                // after fixing
                where: {
                    UserId: userId
                },
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
                /* .map(history => history.toJSON)
                .map(history => _.extend(
                    {},
                    history.Song,
                    history
                )) */

            res.send(_.uniqBy(histories, history => history.SongId))
            } catch (err) {
                res.status(500).send({
                    error: 'an error has occured trying to fetch the history'
                })
            }
    },

    async post (req, res) {
        try {
            const { userId, songId } = req.body
            const history = await History.create({
                SongId: songId,
                UserId: userId
            })

            res.send(history)
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: 'an error has occured trying to created history object'
            })
        }
    }
}
