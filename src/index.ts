import express from 'express'
const app = express()
const port = 5001
const allowCrossDomain = function (req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain)
app.get('/', function (req, res) {
    res.send('Hello Worlds!');
});
app.listen(port, () => console.log(`Running on port ${port}`))