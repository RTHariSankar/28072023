const express = require('express');
const morgan = require('morgan');
const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());

app.use(morgan('dev'));
const PORT = process.env.PORT;

require('./dB/mongodb');

const loginSignup = require('./routes/loginSignup');
app.use('/api',loginSignup);

const reqAdminApi = require('./routes/requirement');
app.use('/api',reqAdminApi);

// Error handling middleware

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})
