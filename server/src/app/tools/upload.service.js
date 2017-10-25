const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary');

cloudinary.config();

const storage = cloudinaryStorage({
  cloudinary,
  filename: (req, file, cb) => {
    cb(undefined, file.originalname);
  },
});

const parser = multer({ storage });

module.exports = parser;


/*  = (app, url) => {
  app.route(`${url}`)
    .post(parser.any(), (req, res) => {
      req.files.forEach(e => {
        console.log(e.url);
        console.log(e.secure_url);
      });
      return rest.returnArray([], res);
    });
};
 */
