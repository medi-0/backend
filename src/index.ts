import express from 'express'
const app = express()
const port = 5001
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, () => console.log(`Running on port ${port}`))