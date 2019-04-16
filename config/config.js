//Database options
module.exports.dbOptions = {
    'host': 'localhost',
    'port': '3306',
    'username': 'root',
    'password': 'PAgj3ukX',
    'database': 'flg_framework'
};

// Server port
module.exports.serverPort = 3060;

// Server mode
// 'live'    - no server console errors(save errors in logs)
// 'develop' - errors in server console
module.exports.serverMode = 'develop';

//path to install files
module.exports.installDir = 'install/db/mysql/';

//path to cron tasks
module.exports.cronDir = 'cron/';
