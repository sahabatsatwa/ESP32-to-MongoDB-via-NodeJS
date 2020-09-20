const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Item = require('./models/item.js');
const path = require('path');
const mongoURI = require('./koneksi/keyDB').suhu;


mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB sudah terkoneksi...'))
    .catch(err => console.log(err));

const app = express();

app.use(bodyParser.json());

/* app.use(express.static(path.join(__dirname, 'client/public')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
}); */

/* app.get("/",(req, res) => {
	res.send('<h1>Hello World<h1>')
}) */

app.get('/api/suhu', function(req, res) {
    Item.find()
        .then(items => res.json(items.slice(items.length - 6, items.length)))
        .catch(err => console.log(err));
});


app.post('/api/suhu', function(req, res) {

    const newItem = new Item({
        suhu_tubuh: req.body.suhu_tubuh,
    });

    newItem.save()
        .then(item => res.json(item));
    console.log(req.body);
});


const port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log(`Server dijalankan pada port ${port}`);
});