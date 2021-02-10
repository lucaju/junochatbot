import express, { Request, Response, Router } from 'express';
import multer, { Multer, StorageEngine } from 'multer';
import fs from 'fs-extra';

const router:Router = express.Router();
router.use(express.json());

const BASE_FOLDER:string = './volume/upload/users/';

const allowedFileTypes:string[] = ['jpg', 'jpeg', 'png'];
const allowedFileMimeTypes:Set<String> = new Set();
allowedFileTypes.forEach((type:string) => allowedFileMimeTypes.add(`image/${type}`));

const storage:StorageEngine = multer.diskStorage({
  destination: async (req:Request, file:Express.Multer.File, cb:any) => {
    await fs.ensureDir(BASE_FOLDER);
    cb(null, BASE_FOLDER);
  },

  filename: (req:Request, file:Express.Multer.File, cb:any) => {
    cb(null, req.body.uniqueFileName);
  },
});

const fileFilter = (req:Request, file:Express.Multer.File, cb:any) => {
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

const upload:Multer = multer({ storage: storage, fileFilter: fileFilter });

//--------------

router.use('/avatar', express.static('./volume/upload/users'));

router.post('/avatar', upload.single('avatar'), async (req:Request, res:Response) => {
  res.status(200).send();
});

router.put('/avatar', upload.single('avatar'), async (req:Request, res:Response) => {
  if (req.body.removeAvatar) {
    await fs.remove(`${BASE_FOLDER}${req.body.removeAvatar}`);
  }
  res.status(200).send();
});

router.delete('/avatar', async (req:Request, res:Response) => {
  await fs.remove(`${BASE_FOLDER}${req.body.removeAvatar}`);
  res.status(200).send();
});

export default router;
