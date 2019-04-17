# Documentation for "flg_framework"

## Mysql installs

- By default you can create install files in next path:

```
install/bd/mysql/
```

```
...

module.exports.installDir = 'install/db/mysql/';

...
```

- File name must start with "**Install_#1_#2**"
(#1 - number of install file; #2 - description)
```
Example:

"Install_001_CreateUserTable.js"
```

- Main file content:
```
let AbstractInstallService = require('../../../core/db/mysql/AbstractInstallService.js');

class CreateUserTable extends AbstractInstallService
{
    constructor()
    {
        super();

        this.query = [
            `CREATE TABLE MyGuests (
             id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
             firstname VARCHAR(30) NOT NULL,
             lastname VARCHAR(30) NOT NULL,
             email VARCHAR(50),
             reg_date TIMESTAMP);`,
             
            `INSERT INTO MyGuests (firstname, lastname, email)
             VALUES (?, ?, ?);`,
            ...
        ];
        
        this.queryData = [
            [],
            [
                'John',
                'Doe',
                'john@example.com'
            ],
            ...
        ];
    }
}

module.exports = CreateUserTable;
```

**this.query** - [array] - list of queries

**this.queryData** - [array] - list of variables for query list (optional)
