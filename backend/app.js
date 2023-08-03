const express = require('express');
const morgan = require('morgan');
const app = express();
const multer = require("multer");
const { uploadToGoogleDrive , deleteFile,fetchFiles } = require("./functions");
const upload = multer();

require('dotenv').config();

const cors = require('cors');
app.use(cors());

app.use(morgan('dev'));
const PORT = process.env.PORT;

require('./dB/mongodb')

const loginSignup = require('./routes/loginSignup');
app.use('/api',loginSignup);

const reqAdminApi = require('./routes/requirement');
app.use('/api',reqAdminApi);

app.post("/upload-file-to-google-drive", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }

    const fileId = await uploadToGoogleDrive(req.file);

    res.status(200).json({ fileId });
  } catch (err) {
    console.error("Error uploading to Google Drive:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.post("/delete-file-from-google-drive/:id", async (req, res) => {
  console.log(req.params.id)
  const fileId = req.params.id; // Assuming fileId is sent in the request body

  if (!fileId) {
    res.status(400).send("File ID not provided.");
    return;
  }

  const deleted = await deleteFile(fileId);

  if (deleted) {
    res.status(200).send("File deleted from Google Drive.");
  } else {
    res.status(500).send("Error deleting file from Google Drive.");
  }
});

app.get("/get-files-list", async (req, res) => {
  try {
    const filesList = await fetchFiles();
    res.status(200).json({ files: filesList });
    // console.log(filesList)
  } catch (error) {
    console.error("Error fetching files list:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})
