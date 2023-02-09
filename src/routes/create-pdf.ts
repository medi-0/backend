import fs from "fs";
import PDFDocument from 'pdfkit-table'
// import path from 'path'

interface PdfTable {
    title: string;
    text: string;
    headers: string[];
    rows: string[][];
}
export const createPdf = async (req: any, res: any) => {
    console.log("/createpdf called")
    const req1 = req.body
    console.log(`req1:${JSON.stringify(req1)}`)
    // const reqJson = req.body.data
    const reqJson = req.body
    console.log(`reqJson:${JSON.stringify(reqJson)}`)
    // convert json to object 
    var reqObj: PdfTable = {
        title: "",
        text: "",
        headers: [],
        rows: []
    }
    try {
        reqObj = reqJson
    } catch (error) {
        console.log(`error:${error}`)
    }
    console.log(`reqObj:${reqObj}`)
    if (reqObj.headers.length === 0 || reqObj.rows.length === 0) {
        res.status(400).json({ error: "No data to create pdf" });
        return
    }
    console.log(reqObj)
    console.log(JSON.stringify(reqObj))

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
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);
    const reqTableArray = {
        title: reqObj.title,
        subtitle: reqObj.text,
        headers: reqObj.headers,
        rows: reqObj.rows,
    }
    // console.log(`reqTableArray${JSON.stringify(reqTableArray)}}`)
    doc.table(reqTableArray)
    doc.text(
        "Powered by ZKDoc",
        460, // x 
        10, // y
    )
    // if your run express.js server:
    // HTTP response only to show pdf
    doc.pipe(res);
    doc.end();
    // res.status(200).json({ data: pdfPath.slice(1) });
    // this should work but it doesn't
    // return res.status(200).json({ data: pdfPath.slice(1) });

}  