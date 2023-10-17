const db = require('../../models');

class AreaController {
    async getAreas(req, res, next) {
        try {
            const response = await db.Area.findAll({
                raw: true,

                attributes: ['code', 'value', 'order'],
            });
            return res.status(200).json({
                err: response ? 0 : 1,
                msg: response ? 'OK' : 'failed to get area',
                response,
            });
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: 'failed to get areas' + error,
            });
        }
    }
}
module.exports = new AreaController();
