import express from 'express';
import multer from 'multer';
import fs from 'fs-extra';
import { sendEmail } from '../emails/index.mjs';

const router = new express.Router();
router.use(express.json());

const BASE_FOLDER = './volume/upload/users/';

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

router.use('/avatar', express.static('./volume/upload/users'));

router.post('/avatar', upload.single('avatar'), async (req, res) => {
  res.status(200).send();
});

router.put('/avatar', upload.single('avatar'), async (req, res) => {
  if (req.body.removeAvatar) {
    await fs.remove(`${BASE_FOLDER}${req.body.removeAvatar}`);
  }
  res.status(200).send();
});

router.delete('/avatar', async (req, res) => {
  await fs.remove(`${BASE_FOLDER}${req.body.removeAvatar}`);
  res.status(200).send();
});

//--------------

router.post('/emailnotification', async ({ body: { notification } }, res) => {
  await sendEmail(notification);
  res.status(200).send();
});

export default router;
