const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./route/api');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true });
mongoose.connection.on('error', err => {
    console.log('ERROR! ' + err);
});
mongoose.connection.on('connected', () => {
    console.log('DONE! mongoDB connected...');
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', route);

app.listen(3000, () => {
    console.log('server listening to port 3000...');
});