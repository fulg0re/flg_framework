const config = require('../../config/config.js');

class InstallFileStatus
{
    constructor()
    {
        this.config = config;
    }

    selectByFileName(fileName)
    {
        return new Promise(async (resolve, reject) => {
            try {
                let selectQuery = `SELECT * FROM install_file_status WHERE file_name = ?`;
                let select = await global.dbConnection.runQuery(selectQuery, fileName);

                resolve(select);
            } catch (err) {
                global.errorHandler.handleError(
                    err,
                    __filename + '(selectByFileName)'
                );
            }
        });
    }

    selectFilesForInstall(type)
    {
        return new Promise(async (resolve, reject) => {
            try {
                let selectQuery = `SELECT * FROM install_file_status 
                WHERE (type = ? AND status <> 'finished');`;
                let select = await global.dbConnection.runQuery(selectQuery, [type]);

                resolve(select);
            } catch (err) {
                global.errorHandler.handleError(
                    err,
                    __filename + '(selectByFileName)'
                );
            }
        });
    }

    insert(data)
    {
        return new Promise(async (resolve, reject) => {
            try {
                let insertQuery = `INSERT INTO install_file_status 
                        (type, file_name, file_path, status)
                        VALUES (?, ?, ?, ?);`;

                let insert = await global.dbConnection.runQuery(insertQuery, data);

                resolve(insert);
            } catch (err) {
                global.errorHandler.handleError(
                    err,
                    __filename + '(insert)'
                );
            }
        });
    }

    updateToFinished(fileName)
    {
        return new Promise(async (resolve, reject) => {
            try {
                let updateQuery = `UPDATE install_file_status
                        SET status = 'finished'
                        WHERE file_name = ?;`;

                let update = await global.dbConnection.runQuery(updateQuery, fileName);

                resolve(update);
            } catch (err) {
                global.errorHandler.handleError(
                    err,
                    __filename + '(updateToFinished)'
                );
            }
        });
    }
}

module.exports = InstallFileStatus;