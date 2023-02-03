# backend
## endpoints
`/processpdf`
- description: 
    - uploads the pdf file to a temporary folder on the express server
    - parses the pdf and extracts the text from it
    - returns the parsed text as a json object
- input: 
    - "Content-Type": "multipart/form-data"
    - takes in a form data object
`/createpdf`
- takes in JSON object and a table of contents and creates a pdf file
- input interface from client:
```typescript
interface PdfTable {
    title: string;
    headers: string[];
    rows: string[][];
}
```
- output: 
    - if 200, the created file would be in `/pdfs/<filename>.pdf`

`/createqrpdf
- takes in a JSON object and creates a pdf file with QR code
- input:
```typescript
interface QrData {
    filename: string;
    text: string;
    data: string; // text to be converted to qr code
}
```