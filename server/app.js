/*
API Endpoints for companies:
1. GET /api/companies/:company_name - Scrape all data of a company
2. GET /api/companies/:company_name/reviews - Scrape reviews of a company
3. GET /api/companies/:company_name/salaries - Scrape salaries of a company
4. GET /api/companies/:company_name/info - Scrape basic info of a company

Create a new Express app and use the router above to create the API endpoints.
The server should run on port 3000.

*/
const express = require('express');
const router = require('./router/router');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    console.log('Request received at: ', new Date().toLocaleString());
    next();
})

app.use('/api/companies/', router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});