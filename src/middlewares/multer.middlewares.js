import multer from "multer";
import dayjs from "dayjs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      dayjs().format("DMMMYY") + "-" + dayjs().format("Hmmss");
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
