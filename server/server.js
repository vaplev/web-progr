const express = require('express');
const webpack = require('webpack');
const rewrite = require('express-urlrewrite')
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const app = express();
const config = require('../webpack.config.js');
const compiler = webpack(config);
const path = require('path')
const cookieParser = require('cookie-parser');
const controllers = require('./controllers/controllers-hub');
const apiEndpoints = require('./api/endpounts-hub');
const hbs = require('hbs');
const expressHbs = require("express-handlebars");
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  writeToDisk: true
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 *1000
}))

app.use(cookieParser())
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))

app.engine('hbs', expressHbs({
  //layoutsDir: 'server/views/layouts',
  //partialsDir: 'server/views/partials',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  //partialsDir: path.join(__dirname, '/views/partials'),
  defaultLayout: 'layout',
  extname: 'hbs'
}));


app.use(apiEndpoints);
app.use(controllers);

/* app.use(rewrite('/index', 'index.html'));
app.use(rewrite('/about', 'about.html')); */

app.use((req, res, next)=> {
  res.set(
    'X-HELLO-Andrew', 'Hello Andrew'
  );
  res.cookie('Authorized', 'true')
  next()
})

app.get('/hello-world', (req, res, next) =>{
  const query = req.query
  res.status(200).send({
    message: 'Hello world!',
    query: query
  })
})

app.get('/hello-world/:id', (req, res, next) =>{
  const id = req.params.id;
  const query = req.query
  const headers = req.headers
  res.status(200).send({
    message: 'Hello world!',
    id: id,
    query: query,
    headers: headers
  })
})

app.post('/hello-world', (req, res, next)=> {
  const data = req.body;
  const result = data;
  result.sum = data.value1 + data.value2;
  res.status(200).send(result);

})


app.put('/hello-world', (req, res, next) => {
  const params = req.body;
  console.log(req)
  res.status(200).send(params);
});

app.delete('/hello-world', (req, res, next) => {
  const params = req.params;
  res.status(200).send('ok');
});

app.get('/:name', (req, res, next) => {
   const name = req.params.name || 'index';
   console.log(name);
   const fileName = `${name}.html`
    //res.sendFile(__dirname + '/index.html');
    const root = path.join(__dirname).replace('server', 'dist');
    const options = {
      dotfiles: 'deny',
      root: root
    }
    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err)
      } else {
        console.log('Sent:', fileName)
      }
    });
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!\n');
});