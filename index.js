const http = require('http');
const finalCallback = require('finalhandler');
const bodyParser   = require('body-parser');

//initialize router
const Router = require('router');
const router = Router({});
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

//Error handler
const ErrorHandlerClass = require('./core/error/handler/ErrorService.js');
const error = global.errorHandler = new ErrorHandlerClass();

//Db Service
const dbClass = require('./core/db/mysql/DbService');
const db = global.dbConnection = new dbClass();

//Cron Service
const Cron = require('./core/cron/CronService.js');
const cron = global.cronTask = new Cron();

const config = require("./config/config.js");

//Enable api
const testApi = require('./routes/TestApi');
router.use(testApi);

try {
    //initialize server and add router to it
    const server = http.createServer((req, res) => {
        router(req, res, finalCallback(req, res))
    }).listen(config.serverPort, (err) => {
        console.log(`Server is listening on ${config.serverPort}`);
    });
} catch (err) {
    error.handleError(err, 'index.js(listen)');
}