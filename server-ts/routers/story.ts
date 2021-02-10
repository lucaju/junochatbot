import express from 'express';
import multer from 'multer';
import fs from 'fs-extra';

const router = new express.Router();
router.use(express.json());

const BASE_FOLDER = './volume/upload/stories/';

const allowedFileTypes = ['jpg', 'jpeg', 'png'];
const allowedFileMimeTypes = new Set();
allowedFileTypes.forEach((type) => allowedFileMimeTypes.add(`image/${type}`));

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await fs.ensureDir(BASE_FOLDER);
    cb(null, BASE_FOLDER);
  },

  filename: (req, file, cb) => {
    cb(null, req.body.uniqueFileName);
  },
});

const fileFilter = (req, file, cb) => {
  const stringfyAllowedTypes = () => {
    const firsts = allowedFileTypes.slice(0, allowedFileTypes.length - 1);
    const last = allowedFileTypes[allowedFileTypes.length - 1];
    return `${firsts.join(', ')} or ${last}`;
  };

  if (allowedFileMimeTypes.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Image is not of type ${stringfyAllowedTypes}`), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

//--------------

router.use('/image', express.static('./volume/upload/stories'));

router.post('/image', upload.single('avatar'), async (req, res) => {
  res.status(200).send();
});

router.put('/image', upload.single('image'), async (req, res) => {
  if (req.body.removeImage) {
    await fs.remove(`${BASE_FOLDER}${req.body.removeImage}`);
  }
  res.status(200).send();
});

router.delete('/image', async (req, res) => {
  await fs.remove(`${BASE_FOLDER}${req.body.removeImage}`);
  res.status(200).send();
});

export default router;
