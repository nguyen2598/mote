const db = require('../../models');
const { Op } = require('sequelize');

class PostController {
    async getPosts(req, res, next) {
        try {
            const response = await db.Post.findAll({
                raw: true,
                nest: true,
                include: [
                    {
                        model: db.Image,
                        as: 'images',
                        attributes: ['image'],
                    },
                    {
                        model: db.Attribute,
                        as: 'attributes',
                        attributes: ['price', 'acreage', 'published', 'hashtag'],
                    },
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'phone', 'zalo', 'avatar'],
                    },
                ],
                attributes: ['id', 'title', 'star', 'address', 'description'],
            });
            return res.status(200).json({
                err: response ? 0 : 1,
                msg: response ? 'OK' : 'failed to get post',
                response,
            });
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: 'failed to get post' + error,
            });
        }
    }

    async getPostsLimit(req, res, next) {
        try {
            let { limit, page, priceNumber, areaNumber, ...query } = req.query;
            if (!limit) limit = 10;
            console.log('limit', { priceNumber, areaNumber });
            const queries = {
                ...query,
            };
            // priceNumber: {
            //     [Op.between]: priceNumber,
            // },
            // areaNumber: {
            //     [Op.between]: areaNumber,
            // },
            if (priceNumber) {
                queries.priceNumber = {
                    [Op.between]: priceNumber,
                };
            }
            if (areaNumber) {
                queries.areaNumber = {
                    [Op.between]: areaNumber,
                };
            }
            const response = await db.Post.findAndCountAll({
                where: queries,
                raw: true,
                nest: true,
                offset: (+page - 1) * limit > 0 ? (+page - 1) * limit : 0,
                limit: +limit || 10,
                include: [
                    {
                        model: db.Image,
                        as: 'images',
                        attributes: ['image'],
                    },
                    {
                        model: db.Attribute,
                        as: 'attributes',
                        attributes: ['price', 'acreage', 'published', 'hashtag'],
                    },
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'phone', 'zalo', 'avatar'],
                    },
                ],
                attributes: ['id', 'title', 'star', 'address', 'description'],
            });
            return res.status(200).json({
                err: response ? 0 : 1,
                msg: response ? 'OK' : 'failed to get post',
                response,
            });
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: 'failed to get post' + error,
            });
        }
    }
    async getNewPost(req, res, next) {
        try {
            const response = await db.Post.findAll({
                raw: true,
                nest: true,
                offset: 0,
                order: [['createdAt', 'DESC']],
                limit: 5,
                include: [
                    {
                        model: db.Image,
                        as: 'images',
                        attributes: ['image'],
                    },
                    {
                        model: db.Attribute,
                        as: 'attributes',
                        attributes: ['price', 'acreage', 'published', 'hashtag'],
                    },
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'phone', 'zalo', 'avatar'],
                    },
                ],
                attributes: ['id', 'title', 'star', 'address', 'description', 'createdAt'],
            });
            return res.status(200).json({
                err: response ? 0 : 1,
                msg: response ? 'OK' : 'failed to get post',
                response,
            });
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: 'failed to get post' + error,
            });
        }
    }
    async getPostByXToY(req, res, next) {
        try {
            const response = await db.Post.findAll({
                raw: true,
                nest: true,
                offset: 0,
                order: [['createdAt', 'DESC']],
                // limit: 5,
                include: [
                    {
                        model: db.Image,
                        as: 'images',
                        attributes: ['image'],
                    },
                    {
                        model: db.Attribute,
                        as: 'attributes',
                        where: {
                            price: {
                                [Op.between]: [15, 20],
                            },
                        },
                        attributes: ['price', 'acreage', 'published', 'hashtag'],
                    },
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'phone', 'zalo', 'avatar'],
                    },
                ],
                attributes: ['id', 'title', 'star', 'address', 'description', 'createdAt'],
            });
            return res.status(200).json({
                err: response ? 0 : 1,
                msg: response ? 'OK' : 'failed to get post',
                response,
            });
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: 'failed to get post' + error,
            });
        }
    }
}
module.exports = new PostController();
