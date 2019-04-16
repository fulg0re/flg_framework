const config = require('../../config/config.js');
const fs = require('fs');
const util = require('util');

class CronService {
    constructor()
    {
        this.cronTasksDir = __dirname + '/../../' + config.cronDir;
        this.fsReadDir = util.promisify(fs.readdir);

        this.initService();
    }

    async initService()
    {
        try {
            await this.startCronTasks();
        } catch (err) {
            global.errorHandler.handleError(
                err,
                __filename + '(initService)'
            );
        }
    }

    async startCronTasks()
    {
        return new Promise(async (resolve, reject) => {
            try {
                let cronTaskFiles = await this.fsReadDir(this.cronTasksDir);

                let index = 1;
                cronTaskFiles.forEach(async (cronTaskFile) => {
                    let CronTaskClass = require(this.cronTasksDir + cronTaskFile);
                    let cron = new CronTaskClass();
                    await cron.run();

                    if (index === cronTaskFiles.length) {
                        resolve();
                    }

                    index++;
                });
            } catch (err) {
                global.errorHandler.handleError(
                    err,
                    __filename + '(startCronTasks)'
                );
            }
        });
    }
}

module.exports = CronService;