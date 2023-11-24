const db = require('../../models');

class UserController {
    async getCurrent(req, res, next) {
        const { id } = req.user;
        try {
            const response = await db.User.findOne({
                raw: true,
                where: { id },
                attributes: {
                    exclude: ['password'],
                },
            });
            return res.status(200).json({
                err: response ? 0 : 1,
                msg: response ? 'OK' : 'failed to get provinxe',
                response,
            });
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: 'failed to get provinxe' + error,
            });
        }
    }
    async updateUser(req, res, next) {
        const { id } = req.user;
        const payload = req.body;
        console.log({ payload });
        try {
            if (!payload)
                return res.status(400).json({
                    err: 1,
                    msg: 'thieu payload',
                });
            const response = await db.User.update(payload, {
                raw: true,
                where: { id },
            });
            return res.status(200).json({
                err: response[0] > 0 ? 0 : 1,
                msg: response[0] > 0 ? 'OK' : 'failed to udpate',
                response,
            });
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: 'failed to get provinxe' + error,
            });
        }
    }
}
module.exports = new UserController();
