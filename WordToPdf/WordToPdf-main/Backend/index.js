// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const docxToPDF = require("docx-pdf");
// const path = require("path");

// const app = express();
// const port = 3000;

// app.use(cors());
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/convertFile", upload.single("file"), (req, res, next) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         message: "No file uploaded",
//       });
//     }

//     let outputPath = path.join(
//       __dirname,
//       "files",
//       `${req.file.originalname}.pdf`
//     );
//     docxToPDF(req.file.path, outputPath, (err, result) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).json({
//           message: "Error converting docx to pdf",
//         });
//       }

//       res.download(outputPath, () => {
//         console.log("file downloaded");
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     res.send(500).json({
//       message: "Internal server error",
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf-node");

const app = express();
const port = 3000;

app.use(cors());

// Setup storage for file upload using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Convert docx to PDF
app.post("/convertFile", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // Convert .docx to HTML using mammoth
    const filePath = path.join(__dirname, "uploads", req.file.filename);
    const result = await mammoth.convertToHtml({ path: filePath });
    const htmlContent = result.value;

    // Define PDF output path
    const pdfFileName = `${req.file.originalname.split(".docx")[0]}.pdf`;
    const pdfFilePath = path.join(__dirname, "files", pdfFileName);

    // Create a PDF from the HTML content
    const options = { format: "A4" };
    const file = { content: htmlContent };

    pdf.generatePdf(file, options).then((pdfBuffer) => {
      fs.writeFileSync(pdfFilePath, pdfBuffer);
      res.download(pdfFilePath, () => {
        console.log("PDF downloaded successfully");
      });
    }).catch((error) => {
      console.error("Error generating PDF:", error);
      return res.status(500).json({
        message: "Error generating PDF",
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

