const Router = require('router');
//initialize router
const testApi = Router({mergeParams: true});
let testData = {
    'testField1': 'testField1',
    'testField2': 'testField2',
    'testField3': 'testField3'
};

testApi.route('/test')
    .get(async (req,res) => {
        testData.request = 'This is test GET request';

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({
            testData: testData
        }));
    })
    .post(async (req,res) => {
        testData.request = 'This is test POST request';

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({
            testData: testData
        }));
    })
    .put(async (req,res) => {
        testData.request = 'This is test PUT request';

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({
            testData: testData
        }));
    })
    .delete(async (req,res) => {
        testData.request = 'This is test DELETE request';

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({
            testData: testData
        }));
    });

module.exports = testApi;