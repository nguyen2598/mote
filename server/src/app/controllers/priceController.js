const db = require('../../models');

class PriceController {
    async getPrices(req, res, next) {
        try {
            const response = await db.Price.findAll({
                raw: true,

                attributes: ['code', 'value', 'order'],
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
module.exports = new PriceController();
