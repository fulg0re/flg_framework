const config = require('../../config/config.js');
const cron = require('node-cron');

class AbstractCronService
{
    constructor()
    {
        this.cron = cron;
        this.config = config;
        //  ┌────────────── 1) second (optional)
        //  │ ┌──────────── 2) minute
        //  │ │ ┌────────── 3) hour
        //  │ │ │ ┌──────── 4) day of month
        //  │ │ │ │ ┌────── 5) month
        //  │ │ │ │ │ ┌──── 6) day of week
        //  │ │ │ │ │ │
        //  │ │ │ │ │ │
        //  * * * * * *
        this.cronPeriod = '* * * * * *';
        this.cronName = 'Abstract Cron Name';
    }

    task()
    {
        console.log('In new cron task file, method "task()" must be implemented!!!');
    }

    run()
    {
        return new Promise(async (resolve, reject) => {
            try {
                this.cron.schedule(this.cronPeriod, () => {
                    this.task();
                });

                console.log(`!Server message: Cron task "${this.cronName}" started with period "${this.cronPeriod}"...`);

                resolve();

            } catch (err) {
                global.errorHandler.handleError(
                    err,
                    __filename + '(run)'
                );
            }
        });
    }
}

module.exports = AbstractCronService;