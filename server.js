const express = require('express')
const mongoose = require('mongoose')
const app = express()
const ShortUrl = require('./models/shortUrl')
const port = process.env.PORT || 57611;
const mongoURI = 'mongodb+srv://admin:admin@cluster0.m11dw.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
})

mongoose.connection.once("open", () => {
    console.log("Mongodb CONNECTED");
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls : shortUrls })
})

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullurl })
    res.redirect('/')
})

app.get('/:id', async (req, res) => {
    const url = await ShortUrl.findById(req.params.id);
    res.redirect(url.full)
})

var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});
