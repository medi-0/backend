import fs from "fs";
import pdf from "pdf-parse";
import multer from 'multer'

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
    console.log(`savedFilePath1:${savedFilePath}`)
    cb(null, tempFilePath) //Appending extension
  }
})

export const upload = multer({ storage: storage });

export const parsePdf = async (req: any, res: any) => {
  console.log("/uploadfile called")
  console.log(req.body);
  console.log(req.files);
  // const resp = upload.array("file")
  // console.log(`resp: ${resp}`)

  // try catch to upload file via multer
  try {
    upload.array("file")
    // return res.json({ message: `Successfully uploaded file to: ${uploadDir + savedFilePath} ` });
  } catch (error) {
    console.error(error)
    return res.status(500).send("Error uploading file");
  }
  // try to parsePDF to text 
  try {
    const currentFilePath = process.cwd() + '/' + uploadDir + savedFilePath
    console.log(`savedFilePath2:${savedFilePath}`)
    console.log(currentFilePath)
    const dataBuffer = fs.readFileSync(currentFilePath);

    const pdfResult = await pdf(dataBuffer).then(function (data: any): string {
      // number of pages
      console.log(data.numpages);
      // number of rendered pages
      console.log(data.numrender);
      // PDF info
      console.log(data.info);
      // PDF metadata
      console.log(data.metadata);
      // PDF.js version
      // check https://mozilla.github.io/pdf.js/getting_started/
      console.log(data.version);
      // PDF text
      console.log(data.text);

      return JSON.stringify(data.text);
    });
    res.status(200).json({ data: pdfResult });
    // res.status(200).json({ data: 'ok' });

  } catch {
    res.status(500).send("Error parsing pdf file")
  }
}