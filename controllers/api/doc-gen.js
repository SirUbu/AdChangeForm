const docx = require("docx")
const router = require("express").Router();

const { Document, Packer, Paragraph, TextRun } = docx;

router.get("/", async (req, res) => {
    let getTextString = () => {
        let queryString = document.location.search;
        let textString = queryString.split("=")[1];
        return textString
    }
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun("Hello World"),
                        new TextRun({
                            text: "Foo Bar",
                            bold: true,
                        }),
                        new TextRun({
                            text: getTextString(),
                            bold: true,
                        }),
                    ],
                }),
            ],
        }],
    });

    const b64string = await Packer.toBase64String(doc);
    
    res.setHeader('Content-Disposition', 'attachment; filename=My Document.docx');
    res.send(Buffer.from(b64string, 'base64'));
})

module.exports = router;