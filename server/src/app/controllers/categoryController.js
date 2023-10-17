const db = require('../../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
class CategoryController {
    async getCategories(req, res, next) {
        try {
            const response = await db.Category.findAll({
                raw: true,
                attributes: ['code', 'value'],
                /*attributes: { // ko lấy những cái bên dưới
                    exclude: ['created_at', 'updated_at'],
                },*/
            });
            return res.status(200).json({
                err: response ? 0 : 1,
                msg: response ? 'OK' : 'failed to get categories',
                response,
            });
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: 'failed to get categories' + error,
            });
        }
    }
}
module.exports = new CategoryController();
