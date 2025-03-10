import multer from "multer";
import dayjs from "dayjs";

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error("Invalid file type. Only JPEG and PNG are allowed."),
      false
    );
  }
  cb(null, true);
};

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Multer saving to ./public/temp");
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    console.log("Multer file:", file);
    const uniqueSuffix = dayjs().format("DMMMYY-Hmmss");
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  },
});

// Multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
});

export default upload;
