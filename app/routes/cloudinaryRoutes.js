/* eslint-disable consistent-return */

const cloudinary = require('cloudinary');
const multer = require('multer');

module.exports = app => {
  const cloudName = process.env.CLOUD_NAME;
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_SECRET;

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  });

  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './my-uploads');
    },
    filename(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.png`);
    }
  });

  const upload = multer({ storage });

  app.post('/api/upload', upload.single('image'), (req, res) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    cloudinary.uploader.upload(req.file.path, result => {
      console.log(result);
    });

    res.status(200).send('Done');
  });
};
