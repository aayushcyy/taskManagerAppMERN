import multer from "multer";
import dayjs from "dayjs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Multer saving to ./public/temp");
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      dayjs().format("DMMMYY") + "-" + dayjs().format("Hmmss");
    console.log("Multer file:", file);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

export default upload;
