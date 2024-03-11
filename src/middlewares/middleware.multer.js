// Import the Multer library for handling file uploads
import multer from "multer";

// Create a Multer storage object that specifies where to store uploaded files
const storage = multer.diskStorage({
  // Specify the destination folder for uploaded files
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  // Specify the file naming convention for uploaded files
  fileName: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Create a Multer instance that uses the storage object
export const upload = multer({
  storage,
});
