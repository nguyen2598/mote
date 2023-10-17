const db = require('../../models');

class ProvinceController {
    async getProvince(req, res, next) {
        try {
            const response = await db.Province.findAll({
                raw: true,

                attributes: ['code', 'value'],
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
module.exports = new ProvinceController();
