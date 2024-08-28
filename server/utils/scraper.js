const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const supported_websites = {
    'indeed': "https://www.indeed.com/cmp/",
    'glassdoor': "https://www.glassdoor.com/Overview/Working-at-"
}

async function ScrapeAllDataFromIndeed(url, user_agent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const output = {};
    await page.setUserAgent(user_agent);
    try {
        await page.goto(url);
        const content = await page.content();

        // Getting the data from the website using cheerio
        const $ = cheerio.load(content);

        // getting the name of the company using itemprop attribute
        const founded = $('li[data-testid="companyInfo-founded"] div.css-vjn8gb.e1wnkr790').text();
        const company_name = $('div[itemprop="name"]').text();
        let rating = $('span.css-1ysbhmm.e1wnkr790').text();
        if (rating === "") {
            rating = $('span.css-4f2law.e1wnkr790').text();
        }
        output['company_name'] = company_name;
        output['overall_rating'] = rating;
        output['founded_in'] = founded;

        // going to the reviews page to get reviews
        await page.goto(url + '/reviews');
        const reviews_content = await page.content();
        const reviews = cheerio.load(reviews_content);
        const company_reviews = reviews('div[itemprop="review"]');
        const reviews_data = company_reviews.map((i, el) => {
            const review_id = i;
            const review_text = reviews(el).find('span.css-15r9gu1.eu4oa1w0').text();
            const review_rating = reviews(el).find('button.css-szf5tt.e1wnkr790').text();
            return { review_id, review_text, review_rating };
        }).get();
        output['reviews_data'] = reviews_data;

        // getting some info about positions and salaries
        await page.goto(url + '/salaries');
        const salaries_content = await page.content();
        const salaries = cheerio.load(salaries_content);
        const postions_data = salaries('div.cmp-SalaryCategoryCard').map((i, el) => {
            const position = salaries(el).find('span.cmp-SalaryCategoryCard-title').text();
            const average_salary = salaries(el).find('span.cmp-SalaryCategoryCard-SalaryValue').text();
            return {position, average_salary};
        }).get();
        output['positions_data'] = postions_data;
    } catch (error) {
        console.log("error happened while fetechnig the data from the website", error);
    } finally {
        await browser.close();
    }
    return output;
}

async function ScrapeBasicInfoFromIndeed(url, user_agent){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const output = {};
    await page.setUserAgent(user_agent);
    try {
        await page.goto(url);
        const content = await page.content();

        // Getting the data from the website using cheerio
        const $ = cheerio.load(content);

        // getting the name of the company using itemprop attribute
        const founded = $('li[data-testid="companyInfo-founded"] div.css-vjn8gb.e1wnkr790').text();
        const company_name = $('div[itemprop="name"]').text();
        let rating = $('span.css-1ysbhmm.e1wnkr790').text();
        if (rating === "") {
            rating = $('span.css-4f2law.e1wnkr790').text();
        }
        output['company_name'] = company_name;
        output['overall_rating'] = rating;
        output['founded_in'] = founded;
    } catch (error) {
        console.log("error happened while fetching the data from the website", error);
    }

    return output;
}

async function ScrapeReviewsDataFromIndeed(url, user_agent){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(user_agent);
    try{
        await page.goto(url + '/reviews');
        const reviews_content = await page.content();
        const reviews = cheerio.load(reviews_content);
        const company_reviews = reviews('div[itemprop="review"]');
        const reviews_data = company_reviews.map((i, el) => {
            const review_id = i;
            const review_text = reviews(el).find('span.css-15r9gu1.eu4oa1w0').text();
            const review_rating = reviews(el).find('button.css-szf5tt.e1wnkr790').text();
            return { review_id, review_text, review_rating };
        }).get();
        return {reviews_data};
    } catch (error) {
        console.log("error happened while fetching the data from the website", error);
    }
}

async function ScrapeSalariesDataFromIndeed(url, user_agent){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(user_agent);
    try{
        await page.goto(url + '/salaries');
        const salaries_content = await page.content();
        const salaries = cheerio.load(salaries_content);
        const postions_data = salaries('div.cmp-SalaryCategoryCard').map((i, el) => {
            const position = salaries(el).find('span.cmp-SalaryCategoryCard-title').text();
            const average_salary = salaries(el).find('span.cmp-SalaryCategoryCard-SalaryValue').text();
            return {position, average_salary};
        }).get();
        return {postions_data};
    } catch (error) {
        console.log("error happened while fetching the data from the website", error);
    }
}

function ScrapeDataFromGlassdoor(url){
    return {"message": "Scraping data from Glassdoor is not supported yet"};
}


async function URLMaker (param) {
    return `https://www.indeed.com/cmp/${param}`;
}

exports.ScrapeDataOfCompany = async (req, res) => {
    const user_agent = req.headers['user-agent'];
    const url = await URLMaker(req.params.company);
    const domain = url.split('/')[2].split('.')[1];
    try{
        if (domain in supported_websites) {
            const data = await ScrapeAllDataFromIndeed(url, user_agent);
            res.json(data);
        } else {
            res.json({message: "This website is not supported yet"});
        }
    } catch (error) {
        res.json({message: "An error happened while fetching the data"});
    }   
}

exports.ScrapeCompanyReviews = async (req, res) => {
    const user_agent = req.headers['user-agent'];
    const url = await URLMaker(req.params.company);
    const domain = url.split('/')[2].split('.')[1];
    try{
        if (domain in supported_websites) {
            const data = await ScrapeReviewsDataFromIndeed(url, user_agent);
            res.json(data);
        } else {
            res.json({message: "This website is not supported yet"});
        }
    } catch (error) {
        res.json({message: "An error happened while fetching the data"});
    }
}

exports.ScrapeCompanySalaries = async (req, res) => {
    const user_agent = req.headers['user-agent'];
    const url = await URLMaker(req.params.company);
    const domain = url.split('/')[2].split('.')[1];
    try{
        if (domain in supported_websites) {
            const data = await ScrapeSalariesDataFromIndeed(url, user_agent);
            res.json(data);
        } else {
            res.json({message: "This website is not supported yet"});
        }
    } catch (error) {
        res.json({message: "An error happened while fetching the data"});
    }
}

exports.ScrapeCompanyBasicInfo = async (req, res) => {
    const user_agent = req.headers['user-agent'];
    const url = await URLMaker(req.params.company);
    const domain = url.split('/')[2].split('.')[1];
    try{
        if (domain in supported_websites) {
            const data = await ScrapeBasicInfoFromIndeed(url, user_agent);
            res.json(data);
        } else {
            res.json({message: "This website is not supported yet"});
        }
    } catch (error) {
        res.json({message: "An error happened while fetching the data"});
    }
}
