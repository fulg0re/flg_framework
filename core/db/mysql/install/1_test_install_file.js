let AbstractInstallService = require('../AbstractInstallService.js');

class TestInstallFile extends AbstractInstallService
{
    constructor()
    {
        super();

        this.query =
            [
                `CREATE TABLE IF NOT EXISTS test_table_1 (
                    entity_id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                    type VARCHAR(255) NOT NULL,
                    file_name VARCHAR(255) NOT NULL,
                    file_path VARCHAR(255) NOT NULL,
                    status VARCHAR(30));`
            ];
    }
}

module.exports = TestInstallFile;
