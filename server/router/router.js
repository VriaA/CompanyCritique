/*
    This file contains the routes for the server.
    The server should run on port 3000.
    The routes are:
    1. GET /api/companies/:company_name - Scrape all data of a company
    2. GET /api/companies/:company_name/reviews - Scrape reviews of a company
    3. GET /api/companies/:company_name/salaries - Scrape salaries of a company
    4. GET /api/companies/:company_name/info - Scrape basic info of a company

    The server should log the time of the request.

    The server should use the router from router/router.js to create the API endpoints.
 */

const express = require('express');
const router = express.Router();
const {ScrapeDataOfCompany, ScrapeCompanyReviews, ScrapeCompanySalaries, ScrapeCompanyBasicInfo} = require('../utils/scraper');

router.get('/:company', ScrapeDataOfCompany);
router.get('/:company/reviews', ScrapeCompanyReviews);
router.get('/:company/salaries', ScrapeCompanySalaries);
router.get('/:company/info', ScrapeCompanyBasicInfo);

module.exports = router;