const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/', (req, res) => {
    res.render('')
}

app.listen(3000, () => 'server is listening on port 3000');