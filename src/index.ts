import express from 'express'
import multer from 'multer'
import path from 'path'
import pdf from "pdf-parse";
import fs from "fs";
import { upload, parsePdf } from './routes/upload-parse-pdf';

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
app.post("/processpdf", upload.array("file"), parsePdf);

// final
app.listen(port, () => console.log(`Running on port ${port}`))