const {Song} = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
    async index (req, res) {
        try {
            let songs = null
            const search = req.query.search
            if (search) {
                songs = await Song.findAll({
                    where: {
                        [Op.or]: [
                            {
                                title: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                artist: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                genre: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                album: {
                                    [Op.like]: `%${search}%`
                                }
                            }
                        ]
                        
                        /* $or: [
                            'title', 'artist', 'genre', 'album'
                        ].map(key => ({
                            [key]: {
                                    $like: `%${search}%`
                                }
                            }))
                        } */
                }}).then(songs => songs)
            } else {
                songs = await Song.findAll({
                    limit: 10
                })
            }
            res.send(songs)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the songs'
            })
        }
    },

    async show (req, res) {
        try {
            const song = await Song.findByPk(req.params.songId)
            res.send(song)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the song.'
            })
        }
    },

    async post (req, res) {
        try {
            const song = await Song.create(req.body)
            res.send(song);
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to create the song.'
            })
        }
    },

    async put (req, res) {
        try {
            const song = await Song.update(req.body, {
                where: {
                    id: req.params.songId
                }
            })
            res.send(song);
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to update the song.'
            })
        }
    }
}
