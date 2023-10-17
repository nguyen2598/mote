const scraper = require('./scraper');
const scrapeController = async (browserInstance) => {
    const url = 'https://phongtro123.com/';
    const indexs = [1, 2, 3, 4];
    try {
        const browser = await browserInstance;
        // Gọi hàm cạo ở file scrape

        let categories = await scraper.scrapeCategory(browser, url);
        const selectedCategory = categories.filter((category, index) => indexs.some((i) => i === index));
    } catch (error) {
        console.log('lỗi ở scrapeController.js', error);
    }
};

module.exports = scrapeController;
