var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var expressWinston = require('express-winston');
var winston = require('winston'); // for transports.Console
var bodyParser = require('body-parser');
var app = express();
var passport=require('passport');
const cors = require('cors');

// express-winston logger makes sense BEFORE the router
var appRoot = require('app-root-path');

    app.use(expressWinston.logger({
      transports: [
          new winston.transports.File( {
            level: 'info',
            filename: `${appRoot}/logs/app.log`,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
          }),

    new winston.transports.Console({
          json: true,
          colorize: true
        })
      ]
    }));


    // express-winston errorLogger makes sense AFTER the router.
    app.use(expressWinston.errorLogger({
        transports: [
           new winston.transports.File( {
            level: 'error',
            filename: `${appRoot}/logs/error.log`,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
          }),

        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ]
    }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist-browser')));
// app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb','extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '50mb'})); // parse application/json
app.use(bodyParser.json({limit: '50mb', type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(passport.initialize());


try{
require('./routes')(app, fs);
}catch(e){
  console.log(e);
}

// handle uncaught exceptions w
process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log('uncaughtException');
    console.error(err.stack);
    console.log(err);
});

// handle app level errors
app.use(function (err, req, res, next) {
   // console.error(err.stack);
     winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        // Handle the error here
        res.status(400).json({
            ps_api_response_code: 1001,
            ps_api_response_message: "JSON syntax error"
        });
    } else {
        res.status(500).json({error : err.message, stack : err.stack});
    }
    // Pass the error to the next middleware if it wasn't a JSON parse error
    next(err);
});

module.exports = app;
