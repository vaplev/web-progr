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

app.post('/addsubscriber', (request, response) => {
  if (request.body.address.match(/\S+@\S+\.\S+/) != null)
    response.send(true);
  else {
    response.send(false);
  }
})

app.get("styles/images/ajax-loader.gif", (request, response, next) => {response.sendFile("/dist/images/ajax-loader.gif")});

app.get("/", (request, response) => {response.render("index", {title:"Game_Land"})});

app.listen(8080, function () {
  console.log('Listening on port 8080!\n');
});