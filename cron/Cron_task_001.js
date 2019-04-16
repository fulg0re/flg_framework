let AbstractCronService = require('../core/cron/AbstractCronService.js');

class Cron_task_001 extends AbstractCronService
{
    constructor()
    {
        super();

        this.cronPeriod = '*/5 * * * * *';
        this.cronName = 'Cron_task_001';
    }

    task()
    {
        console.log('yo yo yo))))');
    }
}

module.exports = Cron_task_001;
