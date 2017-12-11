const eventService = require('../lib/events.service');
const organizationService = require('../lib/organizations.service');
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary');
const fs = require('fs');
const mime = require('mime');

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

const uploadFiles = async (id, files, url, isEvent) => {
  files.forEach(async (file) => {
    const obj = {
      name: file.originalname,
      mimetype: file.mimetype,
    };

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
      obj.url = file.secure_url;
    }

    if (process.env.NODE_ENV === 'production') {
      obj.url = `${url}/${id}/files/${obj.realName}`;
      obj.path = file.path;
    }

    if (isEvent) {
      await eventService.addFiles(id, obj);
    } else {
      await organizationService.addFiles(id, obj);
    }
  });
};

const removeFile = async (id, fileName, isEvent) => {
  let element;

  if (isEvent) {
    element = await eventService.getById(id);
  } else {
    element = await organizationService.getById(id);
  }

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
    await cloudinary.uploader.destroy(fileName);

    if (isEvent) {
      element.files = element.files.filter(file => file.name !== fileName);
    } else {
      element.banner = undefined;
    }
  }

  if (process.env.NODE_ENV === 'production') {
    element.files.map((file) => {
      if (file.realName === fileName) {
        fs.unlinkSync(file.path);
      }
      return file;
    });
  }

  // event.files = event.files.filter(el => el.realName !== fileName);

  if (isEvent) {
    return eventService.updateEvent(element._id, element);
  }
  return organizationService.updateOrganization(element);
};

module.exports = {
  getParser,
  uploadFiles,
  removeFile,
};
