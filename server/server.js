const express = require('express');
const webpack = require('webpack');
const rewrite = require('express-urlrewrite')
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const app = express();
const config = require('../webpack.config.js');
const compiler = webpack(config);
const path = require('path')

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

/* app.use(rewrite('/index', 'index.html'));
app.use(rewrite('/about', 'about.html')); */



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