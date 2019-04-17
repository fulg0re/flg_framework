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

                for (let index = 0; index < this.query.length; index++) {
                    let run = await global.dbConnection.runQuery(this.query[index], this.queryData[index]);
                    result.push(run);
                }

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