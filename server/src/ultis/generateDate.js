const moment = require('moment');

const formatDate = (timeObj) => {
    let day = timeObj.getDay() === 0 ? 'Chủ nhật' : ` Thứ ${timeObj.getDay() + 1}`;
    let date = `${timeObj.getDate()}/${timeObj.getMonth() + 1}/${timeObj.getFullYear()}`;
    let time = `${timeObj.getHours()}/${timeObj.getMinutes()}`;
    return `${day}, ${time} ${date}`;
};

const generateDate = () => {
    let today = new Date();
    let gapExpicre = Math.floor(Math.random() * 29) + 1;
    let expicreDay = moment(today).add(gapExpicre, 'd').toDate();
    // let day = today.getDay() === 0 ? 'Chủ nhật' : ` Thứ ${today.getDay() + 1}`;
    // let date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    // let time = `${today.getHours()}/${today.getMinutes()}`;
    return {
        today: formatDate(today),
        expicreDay: formatDate(expicreDay),
    };
};
module.exports = generateDate;
