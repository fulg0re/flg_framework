let AbstractInstallService = require('../../../core/db/mysql/AbstractInstallService.js');

class TestInstall extends AbstractInstallService
{
    constructor()
    {
        super();

        this.query =
            [
                `CREATE TABLE IF NOT EXISTS MyGuests (
                 id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
                 firstname VARCHAR(30) NOT NULL,
                 lastname VARCHAR(30) NOT NULL,
                 email VARCHAR(50),
                 reg_date TIMESTAMP);`,

                `INSERT INTO MyGuests (firstname, lastname, email)
                 VALUES (?, ?, ?)`
            ];

        this.queryData = [
            [],
            [
                'John',
                'Doe',
                'john@example.com'
            ]
        ];
    }
}

module.exports = TestInstall;
