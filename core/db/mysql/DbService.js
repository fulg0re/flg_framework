const config = require('../../../config/config.js');
const mysql = require('mysql');
const fs = require('fs');
const util = require('util');
const InstallFileStatusModel = require('../../model/InstallFileStatus.js');

class DbService {
    constructor()
    {
        this.options = config.dbOptions;
        this.pool = null;
        this.installType = {
            core: 'core',
            custom: 'custom'
        };
        this.installDirs = {
            core: __dirname + '/install/',
            custom: __dirname + '/../../../' + config.installDir
        };
        this.installModel = new InstallFileStatusModel();
        this.fsReadDir = util.promisify(fs.readdir);

        this.initService();
    }

    async initService()
    {
        try {
            await this.dbCheck();
            await this.connect();
            await this.createMainTable();
            await this.getFiles();
            await this.runInstalls('core', this.installDirs.core);
            await this.runInstalls('custom', this.installDirs.custom);
        } catch (err) {
            global.errorHandler.handleError(
                err,
                __filename + '(initService)'
            );
        }
    }

    dbCheck()
    {
        return new Promise((resolve, reject) => {
            let con = mysql.createConnection({
                host    : this.options.host,
                user    : this.options.username,
                password: this.options.password
            });

            try {
                con.connect(function(err) {
                    con.query(`USE ${config.dbOptions.database}`, function (err, result) {
                        if (err) {
                            console.log(`Database "${config.dbOptions.database}" not found..."`);
                            console.log(`Creating "${config.dbOptions.database}" database..."`);
                            con.query(`CREATE DATABASE ${config.dbOptions.database}`, (err, result) => {
                                console.log(`Database "${config.dbOptions.database}" was created..."`);
                            });
                        }

                        resolve();
                    });
                });
            } catch (err) {
                global.errorHandler.handleError(
                    err,
                    __filename + '(dbCheck)'
                );
            }
        });

    }

    createMainTable()
    {
        return new Promise(async (resolve, reject) => {
            let query = `CREATE TABLE IF NOT EXISTS install_file_status (
                            entity_id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                            type VARCHAR(255) NOT NULL,
                            file_name VARCHAR(255) NOT NULL,
                            file_path VARCHAR(255) NOT NULL,
                            status VARCHAR(30)
                        );`;

            try {
                let select = await global.dbConnection.runQuery(query, []);

                resolve();

            } catch (err) {
                global.errorHandler.handleError(
                    err,
                    __filename + '(createMainTable)'
                );
            }
        });

    }

    connect()
    {
        return new Promise(async (resolve, reject) => {
            try {
                this.pool = mysql.createPool({
                    host    : this.options.host,
                    user    : this.options.username,
                    password: this.options.password,
                    database: this.options.database,
                    charset : "utf8mb4"
                });

                //check connection. If OK
                this.pool.query('SELECT 1 + 1 AS solution', function (err, results, fields) {
                    console.log('Db connected');

                    resolve();
                });
            } catch (err) {
                global.errorHandler.handleError(
                    err,
                    __filename + '(connect)'
                );
            }
        });
    }

    getPool()
    {
        return this.pool;
    }

    getConnection()
    {
        return new Promise((resolve, reject) => {
            try {
                this.pool.getConnection((err, connection) => {
                    return err ? reject(err) : resolve(connection);
                })
            } catch (err) {
                global.errorHandler.handleError(
                    err,
                    __filename + '(getConnection)'
                );
            }
        });
    }

    runQuery(query, data)
    {
        return new Promise((resolve, reject) => {
            try {
                this.getConnection()
                    .then(connection => {
                        connection.query(query, data, (error, results, fields) => {
                            // We done with connection return to pool
                            connection.release();
                            return error ? reject(error) : resolve(results);
                        });
                    })
                    .catch(err => reject(err));
            } catch (err) {
                global.errorHandler.handleError(
                    err,
                    __filename + '(runQuery)'
                );
            }
        });
    }

    runInstalls(type, installFilePath)
    {
        return new Promise(async (resolve, reject) => {
            try {
                let select = await this.installModel.selectFilesForInstall(type);

                if (select.length === 0) {
                    resolve();
                }

                let index = 1;
                if (select.length > 0) {
                    select.forEach(async (fileData) => {
                        let fileName = fileData.file_name;
                        let InstallClass = require(installFilePath + fileName);
                        let install = new InstallClass();
                        let runResult = await install.run();
                        let update = await this.installModel.updateToFinished(fileName);
                        console.log(`Install complete(${type} file): ${fileName}`);

                        if (index === select.length) {
                            resolve();
                        }

                        index++;
                    });
                }
            } catch (err) {
                global.errorHandler.handleError(
                    err,
                    __filename + '(runInstalls)'
                );
            }
        });
    }

    getFiles()
    {
        return new Promise(async (resolve, reject) => {
            try {
                let files = {
                    coreFiles: [],
                    customFiles: []
                };

                for (let type in this.installDirs) {
                    if (this.installDirs.hasOwnProperty(type)) {
                        let typeFiles = await this.fsReadDir(this.installDirs[type]);

                        files[`${type}Files`] = await this.filterInstallFiles(
                            typeFiles,
                            this.installDirs[type],
                            this.installType[type]
                        );
                    }
                }

                resolve(files);

            } catch (err) {
                global.errorHandler.handleError(
                    err,
                    __filename + '(getFiles)'
                );
            }
        });
    }

    filterInstallFiles(files, path, type)
    {
        return new Promise((resolve, reject) => {
            let result = [];
            let filesCount = 1;

            try {
                files.forEach(async (file) => {
                    let select = await this.installModel.selectByFileName(file);

                    if (select.length === 0) {
                        let insertData = [
                            type,
                            file,
                            path + file,
                            'new'
                        ];

                        let insert = await this.installModel.insert(insertData);

                        if (insert.length !== 0) {
                            console.log(`FILE ADDED "${path + file}"`);
                            result.push(path + file);
                        }
                    }

                    if (filesCount === files.length) {
                        resolve(result);
                    }

                    filesCount++;
                });
            } catch (err) {
                global.errorHandler.handleError(
                    err,
                    __filename + '(filterInstallFiles)'
                );
            }
        });
    }
}

module.exports = DbService;