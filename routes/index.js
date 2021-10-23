const express = require('express');
const router = express.Router();
const url = require('url');
const apiCache = require('apicache');

// for our requests
// you can use fetch instead of needle
const needle = require('needle');

// env vars
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// initialize cache
let cache = apiCache.middleware;


// routes
router.get('/', cache('2 minutes'), async (req, res) => {
    try {
        console.log(url.parse(req.url, true).query)
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        });

        const apiRes = await needle('get', `${API_BASE_URL}?${params}`)
        const data = apiRes.body;

        if (process.env.NODE_ENV !== 'production') {
            console.log(`Request: ${API_BASE_URL}?${params}`);
        }

        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err
        })
    }
})

module.exports = router;