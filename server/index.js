const express = require('express');
const path = require('path');

const coordinate = require('../src/coordinate');

const app = express();
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

const port = 31413;

app.get('/', (req, res) => { res.render('night.html'); });

app.listen(port, () => { console.log(`Server is running on 127.0.0.1:${port}`); });
