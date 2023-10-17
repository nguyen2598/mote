const db = require('../../models');

class UserController {
    async getCurrent(req, res, next) {
        const { id } = req.user;
        console.log({ id });
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
}
module.exports = new UserController();
