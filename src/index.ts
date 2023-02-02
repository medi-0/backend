import express from 'express'
// import multer from 'multer'
import path from 'path'
// import pdf from "pdf-parse";
import fs from "fs";
import bodyParse from 'body-parser'
import { upload, parsePdf } from './routes/upload-parse-pdf';
import { createPdf } from './routes/create-pdf';
import cors from 'cors'
// create folder 
var dir = './pdfs';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}


const app = express()
const port = 5001
// const allowCrossDomain = function (req: any, res: any, next: any) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// };
// app.use(allowCrossDomain)
app.use(cors())
app.use(bodyParse.json())

app.use('/pdfs', express.static(path.join(process.cwd(), 'pdfs')));

app.get('/', function (req, res) {
    res.send('Hello Worlds!');
});
app.post("/processpdf", upload.array("file"), parsePdf);

app.post("/createpdf", createPdf);


// final
app.listen(port, () => console.log(`Running on port ${port}`))