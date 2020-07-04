const express = require('express');
const webpack = require('webpack');
const rewrite = require('express-urlrewrite')
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// для post

const bodyParser = require("body-parser");
const router = express.Router();

const app = express();
const config = require('../webpack.config.js');
const compiler = webpack(config);
const path = require('path')
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const expressHbs = require("express-handlebars");
const { response } = require('express');

// для post

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const qoutes = require('./data/qoutes.js');

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  writeToDisk: true
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 *1000
}))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))

app.engine('hbs', expressHbs({
  layoutsDir: path.join(__dirname, '/views/layouts'),
  defaultLayout: 'layout',
  extname: 'hbs'
}));

app.get("/newsubscriber", (request, response) => {response.render("subscriber", {title:"Thank you!"})})

app.post('/addsubscriber', (request, response) => {
  console.log("new subscriber " + request.body.address);
  response.redirect('/newsubscriber');
})

app.get("/", (request, response) => {response.render("index", {title:"Game_Land", qoutes: qoutes})});

app.listen(8080, function () {
  console.log('Listening on port 8080!\n');
});