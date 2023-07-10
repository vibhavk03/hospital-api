require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const db = require('./config/mongoose.js');

const app = express();

app.use(express.urlencoded({ extended: true }));

/* routing all requests here */
app.use('/', require('./routes'));

/* starting server here */
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in starting server! => error: ${err}`);
    return;
  }
  console.log(`Server listening on port: ${port}`);
});
