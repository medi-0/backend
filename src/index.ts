import express from 'express'
import multer from 'multer'
import path from 'path'

// working 
// const upload = multer({ dest: "uploads/" });
// try with file name and extensions

const uploadDir = 'uploads/'
let savedFilePath = ''

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        console.log(file)
        console.log(file.originalname)
        console.log(file.filename)
        const tempFilePath = Date.now() + '_' + file.originalname
        // save value to global variable
        savedFilePath = tempFilePath
        cb(null, tempFilePath) //Appending extension
    }
})

const upload = multer({ storage: storage });

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
    console.log("/ is called")
    res.send('Hello Worlds!');
});
// upload file
const uploadFiles = (req: any, res: any) => {
    console.log("/uploadfile called")
    console.log(req.body);
    console.log(req.files);
    // const resp = upload.array("file")
    // console.log(`resp: ${resp}`)

    // try catch to upload file via multer
    try {
        upload.array("file")
        return res.json({ message: `Successfully uploaded file to: ${uploadDir + savedFilePath} ` });
    } catch (error) {
        console.error(error)
        return res.status(500).send(error);
    }


    // convert form data to File object
    // const fileObj = new File([singleFile.data], singleFile.name, { type: singleFile.mimetype });
    // console.log(fileObj);
    // singleFile.mv(`./uploads/${singleFile.name}`, (error: any) => {
    //     if (error) {
    //         console.error(error);
    //         return res.status(500).send(error);
    //     }
    //     res.json({ message: "Successfully uploaded files" });
    // });
}
// app.post("/uploadfile", uploadFiles);
// app.post("/uploadfile", upload.array("files"), uploadFiles);
// works
// app.post("/uploadfile", upload.array("file"), uploadFiles);
// test single handler
app.post("/uploadfile", uploadFiles);

// final
app.listen(port, () => console.log(`Running on port ${port}`))