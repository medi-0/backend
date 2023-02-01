import fs from "fs";
import PDFDocument from 'pdfkit-table'
// import path from 'path'

interface PdfTable {
    title: string;
    headers: string[];
    rows: string[][];
}
export const createPdf = async (req: any, res: any) => {
    console.log("/createpdf called")
    const reqJson = req.body.data
    // convert json to object 
    const reqObj: PdfTable = JSON.parse(reqJson)
    if (reqObj.headers.length === 0 || reqObj.rows.length === 0) {
        res.status(400).json({ error: "No data to create pdf" });
        return
    }
    console.log(reqObj)

    // pdftable
    const doc = new PDFDocument(
        {
            size: "A4",
            margin: 50
        }
    )
    const pdfWithExt = reqObj.title + ".pdf"
    const pdfPath = "./pdfs/" + pdfWithExt
    console.log(`pdfPath:${pdfPath}`)
    // create a stream
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);
    const reqTableArray = {
        headers: reqObj.headers,
        rows: reqObj.rows,
    }
    doc.table(reqTableArray)
    // if your run express.js server:
    // HTTP response only to show pdf
    doc.pipe(res);
    doc.end();
    res.status(200).json({ data: pdfPath.slice(1) });
}  