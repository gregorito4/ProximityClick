const express = require('express');
const cors = require('cors');
const app = express();

//---- Settings ----//
app.set('port', process.env.PORT || 4000);

//---- Middlewares ----//
app.use(cors());
app.use(express.json());

// User api routes
app.use('/api/v1/users', require('./routes/user'));

module.exports = app;
