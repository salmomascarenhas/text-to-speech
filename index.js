const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const gtts = require('gtts.js').gTTS;


const PORT = 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'njk');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', (req, res) => {

    const text = req.body.text;
    const speech = new gtts(text);

    speech
        .save('output.mp3')
        .then((data) => { res.download('output.mp3') })
        .catch((err) => console.error(err));

});

app.listen(PORT, (req, res) => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 