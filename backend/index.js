const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const multer = require("multer");
const { getCode } = require("./ai/screenshot");
const { uploadImage } = require("./upload/cloudinary");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/screenshot", upload.single("screenshot"), async (req, res) => {
  const screenshot = req.file;
  console.log("Screenshot request received", screenshot);

  //   const uploadedImage = await uploadImage(screenshot.path);
  //   console.log("Uploaded image", uploadedImage);
  //   const code = await getCode(uploadedImage.secure_url);
  const code = await getCode(screenshot.path);

  res.json({ code });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
