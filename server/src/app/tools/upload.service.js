const eventService = require('../lib/events.service');
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary');
const fs = require('fs');
const mime = require('mime');
const path = require('path');

const storagePath = `${__dirname}/../../../img/`;

const getFileName = file => `${file.fieldname + Date.now()}.${mime.getExtension(file.mimetype)}`;

const getParser = () => {
  let storage;

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
    cloudinary.config();
    storage = cloudinaryStorage({
      cloudinary,
      filename: (req, file, cb) => {
        cb(undefined, file.originalname);
      },
    });
  }

  if (process.env.NODE_ENV === 'production') {
    if (!fs.existsSync(storagePath)) {
      fs.mkdirSync(storagePath);
    }
    storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, storagePath);
      },
      filename: (req, file, cb) => {
        cb(null, getFileName(file));
      },
    });
  }

  return multer({ storage });
};

const uploadFiles = async (eventId, files, url) => {
  files.forEach(async (file) => {
    const obj = {
      name: file.originalname,
      mimetype: file.mimetype,
    };

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
      obj.url = file.secure_url;
    }
    if (process.env.NODE_ENV === 'production') {
      obj.url = `${url}/${eventId}/files/${obj.realName}`;
      obj.path = file.path;
    }
    await eventService.addFiles(eventId, obj);
  });
};

const removeFile = async (eventId, fileName) => {
  const event = await eventService.getById(eventId);

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
    await cloudinary.uploader.destroy(fileName);
    event.files = event.files.filter(file => file.name !== fileName);
  }

  if (process.env.NODE_ENV === 'production') {
    event.files.map((file) => {
      if (file.realName === fileName) {
        fs.unlinkSync(file.path);
      }
      return file;
    });
  }

  // event.files = event.files.filter(el => el.realName !== fileName);

  return eventService.updateEvent(event._id, event);
};

module.exports = {
  getParser,
  uploadFiles,
  removeFile,
};
