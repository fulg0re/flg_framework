const config = require('../../../config/config.js');

class AbstractInstallService
{
    constructor()
    {
        this.config = config;
        this.query = [`SELECT 1 + 1 AS solution`];
        this.queryData = [];
    }

    run()
    {
        return new Promise(async (resolve, reject) => {
            try {
                let result = [];
                let index = 1;
                this.query.forEach(async (query) => {
                    let run = await global.dbConnection.runQuery(query, this.queryData[index]);
                    result.push(run);
                    index++;
                });

                resolve(result);

            } catch (err) {
                global.errorHandler.handleError(
                    err,
                    __filename + '(run)'
                );
            }
        });
    }
}

module.exports = AbstractInstallService;