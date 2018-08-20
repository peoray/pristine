const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/auth_demo', {
        useNewUrlParser: true
    })
    .then(() => console.log('You are connected!'))
    .catch(err => {
        console.log('Error ' + err);
        process.exit(1);
    });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded)



app.get('/', (req, res) => {
    res.render('home');
});

app.get('/secret', (req, res) => {
    res.render('secret');
});

app.listen(3000, () => console.log('server is listening on port 3000'));