const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');

const cors = require('cors');

const http = require('http');


/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env' });
const routes = require('./config/routes');


/**
 * API keys and Passport configuration.
 */

/**
 * Create Express server.
 */
const app = express();


/**
 * Express configuration.
 */
//app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || 8080);


app.use(logger('dev'));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

//auth image api's

app.use(express.static("uploads"));

app.use('/', routes);

const server = http.createServer(app);

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

/**
  * Start Express server.
  */
 app.listen(app.get('port'), () => {
   console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
   console.log('  Press CTRL-C to stop\n');
 });
 
 module.exports = app;