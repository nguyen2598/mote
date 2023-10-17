const scrapeCategory = async (browser, url) =>
    new Promise(async (resolve, reject) => {
        try {
            let page = await browser.newPage(); // mở trình duyệt mới
            await page.goto(url); // truy cập đến url
            await page.waitForSelector('#webpage'); // khi mà cả trang web nằm trong id là #webpage load xong thì mới cào dữ liệu về
            // lay du lieu
            const dataCategory = await page.$$eval('#navbar-menu > ul > li', (els) => {
                dataCategory = els.map((el, index) => {
                    return {
                        category: el.querySelector('a').innerText,
                        link: el.querySelector('a').href,
                    };
                });
                return dataCategory;
            });

            await page.close();
            //
            resolve(dataCategory);
        } catch (error) {
            reject(error);
        }
    });
module.exports = {
    scrapeCategory,
};
