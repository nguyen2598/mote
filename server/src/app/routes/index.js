const authRouter = require('./auth');
const categoryRouter = require('./category');
const postRouter = require('./post');
const priceRouter = require('./price');
const areaRouter = require('./area');
const provinceRouter = require('./province');
const userRouter = require('./user');

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/post', postRouter);
    app.use('/api/price', priceRouter);
    app.use('/api/area', areaRouter);
    app.use('/api/province', provinceRouter);
    app.use('/api/user', userRouter);

    // app.use('/', (req, res, next) => {
    //     res.send('server này có chạy nhá-3');
    // });
}

module.exports = route;
