const puppeteer = require('puppeteer');
const startBrowser = async () => {
    let browser;
    try {
        browser = await puppeteer.launch({
            // có hiện chrome ko , false là có
            headless: false,
            // Khi vào trang web ko tin cậy sẽ bị chặn nếu tin tưởng thì set như dưới
            // Nếu tin tưởng content nội dung thì set như vậy
            args: ['--disable-setuid-sandbox'],
            // Bỏ qua lỗi http
            ignoreHTTPSErrors: true,
        });
    } catch (error) {
        console.log('khong tao duoc browser', error);
    }

    return browser;
};

module.exports = startBrowser;
