import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

const supported_websites = {
    'indeed': 'https://www.indeed.com/cmp/',
    'glassdoor': 'https://www.glassdoor.com/Overview/Working-at-'
};

const URLMaker = async (param) => `https://www.indeed.com/cmp/${param}`;

const ScrapeAllDataFromIndeed = async (url, user_agent) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(user_agent);
    const output = {};

    try {
        await page.goto(url);
        const content = await page.content();
        const $ = cheerio.load(content);

        // Extract basic company information
        const founded = $('li[data-testid="companyInfo-founded"] div.css-vjn8gb.e1wnkr790').text();
        const company_name = $('div[itemprop="name"]').text();
        let rating = $('span.css-1ysbhmm.e1wnkr790').text();
        if (rating === '') {
            rating = $('span.css-4f2law.e1wnkr790').text();
        }
        output['company_name'] = company_name;
        output['overall_rating'] = rating;
        output['founded_in'] = founded;

        // Extract reviews
        await page.goto(`${url}/reviews`);
        const reviews_content = await page.content();
        const reviews = cheerio.load(reviews_content);
        output['reviews_data'] = reviews('div[itemprop="review"]').map((i, el) => {
            const review_text = reviews(el).find('span.css-15r9gu1.eu4oa1w0').text();
            const review_rating = reviews(el).find('button.css-szf5tt.e1wnkr790').text();
            return { review_text, review_rating };
        }).get();

        // Extract salaries
        await page.goto(`${url}/salaries`);
        const salaries_content = await page.content();
        const salaries = cheerio.load(salaries_content);
        output['positions_data'] = salaries('div.cmp-SalaryCategoryCard').map((i, el) => {
            const position = salaries(el).find('span.cmp-SalaryCategoryCard-title').text();
            const average_salary = salaries(el).find('span.cmp-SalaryCategoryCard-SalaryValue').text();
            return { position, average_salary };
        }).get();
    } catch (error) {
        alert('Error while fetching data from Indeed:', error);
    } finally {
        await browser.close();
    }

    return output;
};

async function ScrapeBasicInfoFromIndeed(url, user_agent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(user_agent);
    const output = {};

    try {
        await page.goto(url);
        const content = await page.content();
        const $ = cheerio.load(content);

        const founded = $('li[data-testid="companyInfo-founded"] div.css-vjn8gb.e1wnkr790').text();
        const company_name = $('div[itemprop="name"]').text();
        let rating = $('span.css-1ysbhmm.e1wnkr790').text();
        if (rating === '') {
            rating = $('span.css-4f2law.e1wnkr790').text();
        }
        output['company_name'] = company_name;
        output['overall_rating'] = rating;
        output['founded_in'] = founded;
    } catch (error) {
        alert('Error while fetching basic info from Indeed:', error);
    }

    return output;
}

async function ScrapeReviewsDataFromIndeed(url, user_agent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(user_agent);

    try {
        await page.goto(`${url}/reviews`);
        const reviews_content = await page.content();
        const reviews = cheerio.load(reviews_content);
        return {
            reviews_data: reviews('div[itemprop="review"]').map((i, el) => {
                const review_text = reviews(el).find('span.css-15r9gu1.eu4oa1w0').text();
                const review_rating = reviews(el).find('button.css-szf5tt.e1wnkr790').text();
                return { review_text, review_rating };
            }).get()
        };
    } catch (error) {
        alert('Error while fetching reviews data from Indeed:', error);
    }
}

async function ScrapeSalariesDataFromIndeed(url, user_agent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(user_agent);

    try {
        await page.goto(`${url}/salaries`);
        const salaries_content = await page.content();
        const salaries = cheerio.load(salaries_content);
        return {
            positions_data: salaries('div.cmp-SalaryCategoryCard').map((i, el) => {
                const position = salaries(el).find('span.cmp-SalaryCategoryCard-title').text();
                const average_salary = salaries(el).find('span.cmp-SalaryCategoryCard-SalaryValue').text();
                return { position, average_salary };
            }).get()
        };
    } catch (error) {
        alert('Error while fetching salaries data from Indeed:', error);
    }
}

async function ScrapeDataFromGlassdoor(url) {
    return { message: 'Scraping data from Glassdoor is not supported yet' };
}

export async function POST(req) {
    let results = '';
    const data = await req.json();
    console.log(data)

    try {
        // Use Promise.all to handle multiple asynchronous calls more efficiently
        const scrapePromises = data['companies'].map(async (company) => {
            const url = await URLMaker(company);
            console.log(url)
            const domain = url.split('/')[2].split('.')[1];
            if (domain in supported_websites) {
                const result = await ScrapeAllDataFromIndeed(url, req.headers['user-agent']);
                if (result.company_name) {
                    console.log(`Got results for ${result.company_name}`)
                    return `\n${company}:\n${JSON.stringify(result, null, 2)}\n`;
                }
                else {
                    return ''
                }
            } else {
                return ''
            }
        });

        const scrapedResults = await Promise.all(scrapePromises);
        results = scrapedResults.join('');
        if (results) {
            results = 'Here is some scraped data from our system to help you:\n' + results
        }
    } catch (error) {
        alert('Error while processing companies:', error);
        results = 'An error occurred while processing the companies.';
    }
    return new NextResponse(results);
}

