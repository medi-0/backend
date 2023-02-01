import fs from "fs";
import PDFDocument from 'pdfkit-table'
import path from 'path'

interface PdfTable {
    title: string;
    headers: string[];
    rows: string[][];
}
export const createPdf = async (req: any, res: any) => {
    console.log("/createpdf called")
    // console.log(req)
    // console.log(req)
    // const reqJson = JSON.stringify(req)
    console.log(req.body.data)
    // console.log(req.body.data)
    const reqJson = req.body.data
    // convert json to object 
    const reqObj:PdfTable = JSON.parse(reqJson)
    console.log(reqObj)

    // pdftable
    const doc2 = new PDFDocument(
        {
            size: "A4",
            margin: 50
        }
    )
    // doc2.pipe(fs.createWriteStream("./document2.pdf"));
    const pdfWithExt = reqObj.title + ".pdf"
    const pdfPath = "./uploads/" + pdfWithExt
    // create a stream
    const writeStream = fs.createWriteStream(pdfPath);
    doc2.pipe(writeStream);
    // save document

    // dynamic create table 
    const reqTableArray = {
        headers: reqObj.headers,
        rows: reqObj.rows,
    }
    doc2.table(reqTableArray)
    
    // if your run express.js server:
    // HTTP response only to show pdf
    doc2.pipe(res);

    // res.status(200).json({ data: 'ok' });
    // done
    doc2.end();
    
    
    // send file to client
    const currentFilePath = process.cwd() + '/uploads/' + pdfWithExt 
    // console.log(currentFilePath)
    // console.log(path.resolve(__dirname, pdfWithExt))
    // res.sendFile(pdfPath)
    // res.sendFile(path.resolve(__dirname, pdfWithExt))
    // sleep 1 second
    // await new Promise(resolve => setTimeout(resolve, 1000));
    const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));
    
    try {
        // await sleep(5000);
        console.log(currentFilePath)
        // res.sendFile(currentFilePath)
        res.download(currentFilePath)
        
    } catch (error) {
        res.status(500).text(`Error sending file: ${error}`);
        
    }

}