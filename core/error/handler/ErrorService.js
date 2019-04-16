const config = require('../../../config/config.js');
const fs = require('fs');
const os = require("os");
const nodeReport = require('node-report');
nodeReport.setDirectory(__dirname + '/../../../core/error/report/');

class ErrorService {
    constructor()
    {
        this.serverMode = (config.serverMode === 'develop') ? true : false;
        this.logFilePath = __dirname + "/../logs/err.log";
    }

    handleError(error, fileName)
    {
        let timeDate = new Date().toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '');
        let text = `${timeDate} - ${fileName} >> "${error.message}"`;

        // if server is in developer mode
        if (this.serverMode) {
            console.log(`!!!Sever ERROR: ${text}`);
        }

        nodeReport.triggerReport(error);

        // try {
        //     if (fs.existsSync(this.logFilePath)) {
        //         fs.readFile(this.logFilePath, (err, data) => {
        //             this.writeFile(text, data);
        //         });
        //     } else {
        //         this.writeFile(text);
        //     }
        // } catch (err) {
        //     global.errorHandler.handleError(
        //         err,
        //         './core/error/handler/ErrorService.js(handleError)'
        //     );
        // }
    }

    // writeFile(text, data = '')
    // {
    //     fs.writeFile(
    //         this.logFilePath,
    //         text + os.EOL + data,
    //         (err) => {});
    // }
}

module.exports = ErrorService;