const db = require('../../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');

class AuthController {
    async checkUser(req, res, next) {
        try {
        } catch (error) {
            res.status(550).json({ err: -1, success: false, message: 'Lỗi server' });
        }
    }

    async register(req, res, next) {
        const { name, password, phone } = req.body;
        console.log({ name, password, phone });
        try {
            const response = await db.User.findOrCreate({
                where: { phone: phone },
                defaults: {
                    phone,
                    name,
                    password: await argon2.hash(password),
                    id: v4(),
                },
            });
            const token =
                response[1] &&
                jwt.sign({ id: response[0].id, phone: response[0].phone }, process.env.SECRET_KEY, { expiresIn: '2d' });
            if (token) {
                res.json({
                    err: 0,
                    msg: 'Tạo tài khoản thành công',
                    token: token,
                });
            } else {
                res.json({
                    err: 2,
                    msg: 'Tài khoản đã tồn tại',
                    token: null,
                });
            }
        } catch (error) {
            res.status(550).json({ err: -1, msg: 'Lỗi server regis' });
        }
    }

    async login(req, res, next) {
        const { password, phone } = req.body;
        console.log({ ...req.body });
        try {
            const user = await db.User.findOne({
                where: { phone },
                raw: true,
            });
            if (!user) {
                res.status(404).json({ err: -1, msg: 'Tài khoản không tồn tại', token: null });
            } else {
                // Kiểm tra xem đúng mật khẩu không
                const passwordValid = await argon2.verify(user.password, password);
                const token =
                    passwordValid &&
                    jwt.sign({ id: user.id, phone: user.phone }, process.env.SECRET_KEY, {
                        expiresIn: '2d',
                    });
                if (token) {
                    res.json({
                        err: 0,
                        msg: 'Đăng nhập tài khoản thành công',
                        token: token,
                    });
                } else {
                    res.json({
                        err: 2,
                        msg: 'Sai mật khẩu',
                        token: null,
                    });
                }
            }
        } catch (error) {
            res.status(550).json({ err: -1, msg: 'Lỗi server regis' });
        }
    }
}
module.exports = new AuthController();
