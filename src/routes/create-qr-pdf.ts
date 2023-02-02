import qr from 'qr-image';
import PDFDocument from 'pdfkit';
import fs from "fs";
import { Request, Response } from 'express';

interface QrData {
    filename: string;
    text: string;
    data: string;
}
const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));

export const createQRPdf = async (req: Request, res: Response) => {
    const qrData: QrData = JSON.parse(req.body.data)
    console.log(qrData.filename)
    console.log(qrData.data)
    // const qrPath = './qrs/' + qrData.filename + '.png'
    const qrPath = process.cwd() + '/' + 'qrs/' + qrData.filename + '.png'
    console.log(`qrPath:${qrPath}`)
    // const qrWriteStream = fs.createWriteStream(qrPath);
    const pdfPath = process.cwd() + '/' + 'pdfs/' + qrData.filename + '.pdf'
    console.log(`pdfPath:${pdfPath}`)

    try {
        const qrImage = qr.image(
            qrData.data,
            {
                type: 'png',
            }
        )
        // write to file
        // const qrPath = './qrs/' + 'test' + '.png'
        qrImage.pipe(require('fs').createWriteStream(qrPath)) // this works
        // qrImage.pipe(qrWriteStream)
        

    } catch (error) {
        console.log(`error in qr generation:${error}`);
        res.status(500).json({ error: 'QR generation went wrong' });
    }

    // sleep 5 seconds to allow qr image to be written to file
    await sleep(5000)
    try {

        const doc = new PDFDocument(
            {
                size: "A4",
                margin: 50
            }
        )
        const writeStream = fs.createWriteStream(pdfPath);
        doc.pipe(writeStream);
        doc.text(qrData.text)
        doc.image(qrPath, {
            // fit: [250, 300],
            // align: 'center',
            // valign: 'center'
        });

        // Finalize PDF file
        doc.end();
    } catch (error) {
        console.log(`error in qr pdf generation:${error}`);
        res.status(500).json({ error: 'QR PDF generation went wrong' });

    }
 
} 