"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
const PORT = 3000;
const app = express();
app.set('view engine', 'ejs');
app.set('view', './src/views');
app.use(body_parser_1.default.json());
app.use(express.json());
app.get('/', async (req, res) => {
    try {
        const url = 'http://api.openweathermap.org/data/2.5/weather?id=1581130&appid=49a524e356321031137c9627ef062e48&lang=vi';
        const response = await axios_1.default.get(url);
        const data = response.data;
        if (data) {
            res.render('weather', { data });
        }
        else {
            res.end('<h1>ERR</h1>');
        }
    }
    catch (err) {
        res.end('<h1>ERR</h1>');
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map