const db = require('../../models');
const { Op } = require('sequelize');
const { v4 } = require('uuid');
const moment = require('moment');
const { generateCode } = require('../../ultis/generateCode');
const generateDate = require('../../ultis/generateDate');
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
            let { limit, page, priceNumber, order, areaNumber, ...query } = req.query;
            if (!limit) limit = 10;
            const queries = {
                ...query,
            };
            if (order) queries.order = [order];
            else queries.order = [['createdAt', 'DESC']];
            // priceNumber: {
            //     [Op.between]: priceNumber,
            // },
            // areaNumber: {
            //     [Op.between]: areaNumber,
            // },
            if (priceNumber) {
                query.priceNumber = {
                    [Op.between]: priceNumber,
                };
            }
            if (areaNumber) {
                query.areaNumber = {
                    [Op.between]: areaNumber,
                };
            }
            const response = await db.Post.findAndCountAll({
                where: query,
                raw: true,
                nest: true,
                offset: (+page - 1) * limit > 0 ? (+page - 1) * limit : 0,
                limit: +limit || 10,
                // order: [['createdAt', 'DESC']],
                ...queries, // thêm cai order
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
                    {
                        model: db.Overview,
                        as: 'overviews',
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
    async createNewPost(req, res, next) {
        try {
            const {
                categoryCode,
                title,
                priceNumber,
                areaNumber,
                label,
                images,
                description,
                address,
                province,
                areaCode,
                priceCode,
                category,
                target,
                ...payload
            } = req.body;

            let attributesId = v4();
            let imagesId = v4();
            let overviewId = v4();
            let labelCode = generateCode(label);
            const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
            const currentDate = generateDate();
            const { id } = req.user;
            const response = await db.Post.create({
                id: v4(),
                title: title, // v
                labelCode,
                address: address,
                attributesId,
                categoryCode: categoryCode,
                description: JSON.stringify(description) || null,
                userId: id,
                overviewId,
                imagesId,
                areaCode: areaCode,
                priceCode: priceCode,
                provinceCode:
                    generateCode(
                        province?.includes('Thành phố')
                            ? province?.replace('Thành phố', '')
                            : province?.replace('Tỉnh', ''),
                    ) || null,
                priceNumber,
                areaNumber,
            });

            await db.Attribute.create({
                id: attributesId,
                price: `${
                    +priceNumber >= 1
                        ? Math.floor(+priceNumber * 10) / 10 + 'triệu/tháng'
                        : Math.floor(+priceNumber * 1000000) + 'đồng/tháng'
                }`,
                acreage: `${areaNumber} m2`,
                published: moment(new Date()).format('DD/MM/YYYY'),
                hashtag: hashtag,
            });
            await db.Image.create({
                id: imagesId,
                image: JSON.stringify(images),
            });
            await db.Overview.create({
                id: overviewId,
                code: hashtag,
                area: label,
                type: category,
                target: target,
                bonus: 'Tin thường',
                // createdAt: currentDate.today,
                expiredAt: currentDate.expicreDay,
            });
            await db.Province.findOrCreate({
                where: {
                    [Op.or]: [{ value: province?.replace('Thành phố', '') }, { value: province?.replace('Tỉnh', '') }],
                },
                defaults: {
                    code: generateCode(
                        province?.includes('Thành phố')
                            ? province?.replace('Thành phố', '')
                            : province?.replace('Tỉnh', ''),
                    ),
                    value: province?.includes('Thành phố')
                        ? province?.replace('Thành phố', '')
                        : province?.replace('Tỉnh', ''),
                },
            });
            await db.Label.findOrCreate({
                where: {
                    code: labelCode,
                },
                defaults: {
                    code: labelCode,
                    value: label,
                },
            });
            return res.status(200).json({
                err: 0,
                msg: 'ok',
            });
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: 'failed to get post' + error,
            });
        }
    }
    async getPostLimitAdmin(req, res, next) {
        const { page, ...query } = req.query;
        const { id } = req.user;
        console.log({ page, query, id });
        const limit = 10;
        let offset = !page || +page <= 1 ? 0 : +page - 1;
        try {
            const response = await db.Post.findAndCountAll({
                where: { ...query, userId: id },
                raw: true,
                nest: true,
                offset: offset * limit,
                limit: +limit || 10,
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

                        attributes: ['price', 'acreage', 'published', 'hashtag'],
                    },
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'phone', 'zalo', 'avatar'],
                    },
                    {
                        model: db.Overview,
                        as: 'overviews',
                    },
                ],
                // attributes: ['id', 'title', 'star', 'address', 'description', 'createdAt'],
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
    async getPostLimitAdminSearch(req, res, next) {
        const { page, ...query } = req.query;
        const { q } = query;
        const { id } = req.user;
        console.log({ page, query, id, q });
        const limit = 10;
        let offset = !page || +page <= 1 ? 0 : +page - 1;
        try {
            const response = await db.Post.findAndCountAll({
                where: {
                    [Op.or]: [
                        { description: { [Op.like]: `%${q}%` } },
                        { address: { [Op.like]: `%${q}%` } },
                        { title: { [Op.like]: `%${q}%` } },
                        // Các điều kiện khác nếu cần
                    ],
                    userId: id,
                },
                raw: true,
                nest: true,
                offset: offset * limit,
                limit: +limit || 10,
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

                        attributes: ['price', 'acreage', 'published', 'hashtag'],
                    },
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'phone', 'zalo', 'avatar'],
                    },
                    {
                        model: db.Overview,
                        as: 'overviews',
                    },
                ],
                // attributes: ['id', 'title', 'star', 'address', 'description', 'createdAt'],
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
    async updatePost(req, res, next) {
        const {
            postId,
            overviewId,
            areaCode,
            priceNumber,
            areaNumber,
            priceCode,
            imagesId,
            label,
            attributesId,
            title,
            images,
            category,
            target,
            ...payload
        } = req.body;
        const { id } = req.user;
        try {
            if (!postId || !id || !overviewId || !attributesId) {
                return res.status(400).json({
                    err: 1,
                    msg: 'missing post',
                });
            } else {
                let labelCode = generateCode(label);
                const response = await db.Post.update(
                    {
                        title: title,
                        labelCode,
                        address: address,
                        categoryCode: categoryCode,
                        description: JSON.stringify(description) || null,
                        areaCode: areaCode,
                        priceCode: priceCode,
                        provinceCode:
                            generateCode(
                                province?.includes('Thành phố')
                                    ? province?.replace('Thành phố', '')
                                    : province?.replace('Tỉnh', ''),
                            ) || null,
                        priceNumber,
                        areaNumber,
                    },
                    { where: { id: postId } },
                );
                await db.Attribute.update(
                    {
                        price: `${
                            +priceNumber >= 1
                                ? Math.floor(+priceNumber * 10) / 10 + 'triệu/tháng'
                                : Math.floor(+priceNumber * 1000000) + 'đồng/tháng'
                        }`,
                        acreage: `${areaNumber} m2`,
                    },
                    { where: { id: attributesId } },
                );
                await db.Image.update(
                    {
                        image: JSON.stringify(images),
                    },
                    { where: { id: imagesId } },
                );
                await db.Overview.update(
                    {
                        area: label,
                        target: target,
                        type: category,
                    },
                    { where: { id: overviewId } },
                );
                await db.Province.findOrCreate({
                    where: {
                        [Op.or]: [
                            { value: province?.replace('Thành phố', '') },
                            { value: province?.replace('Tỉnh', '') },
                        ],
                    },
                    defaults: {
                        code: generateCode(
                            province?.includes('Thành phố')
                                ? province?.replace('Thành phố', '')
                                : province?.replace('Tỉnh', ''),
                        ),
                        value: province?.includes('Thành phố')
                            ? province?.replace('Thành phố', '')
                            : province?.replace('Tỉnh', ''),
                    },
                });
                await db.Label.findOrCreate({
                    where: {
                        code: labelCode,
                    },
                    defaults: {
                        code: labelCode,
                        value: label,
                    },
                });

                return res.status(200).json({
                    err: 0,
                    msg: 'ok',
                });
            }
        } catch (err) {
            return res.status(500).json({
                err: -1,
                msg: 'fall at post controller',
            });
        }
    }
    async deletePost(req, res, next) {
        const listId = req.body;
        const { id } = req.user;
        try {
            const response = await db.Post.destroy({
                where: {
                    id: {
                        [Op.in]: listId, //Xóa nhiều dòng có những id là ví dụ id=1,2,3,,4,5
                    },
                },

                // include: [
                //     {
                //         model: db.Image,
                //         as: 'images',
                //         attributes: ['image'],
                //     },
                //     {
                //         model: db.Attribute,
                //         as: 'attributes',

                //         attributes: ['price', 'acreage', 'published', 'hashtag'],
                //     },
                //     {
                //         model: db.User,
                //         as: 'user',
                //         attributes: ['name', 'phone', 'zalo', 'avatar'],
                //     },
                //     {
                //         model: db.Overview,
                //         as: 'overviews',
                //     },
                // ],
                // attributes: ['id', 'title', 'star', 'address', 'description', 'createdAt'],
            });
            return res.status(200).json({
                err: response > 0 ? 0 : 1,
                msg: response ? 'OK' : 'failed to delete post',
                response,
            });
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: 'failed to dekete post' + error,
            });
        }
    }
}
module.exports = new PostController();
