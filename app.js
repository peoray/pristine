const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('connected');
});

app.listen(3000, () => 'server is listening on port 3000');