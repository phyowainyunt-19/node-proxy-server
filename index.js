const express = require('express');
const cors = require('cors');
const rateLmt = require('express-rate-limit');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

// middleware for rate limiting
const limiter = rateLmt({
    windowMs: 10 * 60 * 1000,   // 10mins
    max: 100
});

app.use(limiter);
app.set('trust proxy', 1);

// set static folder
app.use(express.static('public'))

// routes
app.use('/api', require('./routes'));

// enable cors
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));