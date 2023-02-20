import express = require('express');
import bodyParser from 'body-parser';
import axios from 'axios';

const PORT = 3000;

const app = express();
app.set('view engine', 'ejs');
app.set('view','./src/views');
app.use(bodyParser.json());
app.use(express.json());


app.get('/', async (req, res) => {
    try {
        const url = 'http://api.openweathermap.org/data/2.5/weather?id=1581130&appid=49a524e356321031137c9627ef062e48&lang=vi';
        const response = await axios.get(url);
        const data = response.data;
        if(data) {
            res.render('weather', {data});
        } else {
            res.end('<h1>ERR</h1>');
        }
    } catch (err) {
        res.end('<h1>ERR</h1>');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});