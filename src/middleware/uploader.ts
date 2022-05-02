import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    let fileExtension: any = file.mimetype;
    fileExtension = fileExtension.split('/')[1];
    cb(null, `${uniquePrefix}.${fileExtension}`);
  },
});

export const upload = multer({ storage: storage });
