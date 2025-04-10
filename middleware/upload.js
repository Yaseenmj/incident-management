// middleware/upload.js

const multer = require('multer');
const path = require('path');

// Storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // create this folder if it doesn't exist
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});


/*
// File filter
const fileFilter = function (req, file, cb) {
  const allowedTypes = /jpeg|jpg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg/.jpeg images are allowed!'));
  }
};  */

// File filter (only .jpg allowed)
const fileFilter = function (req, file, cb) {
  const isJpgExtension = /\.jpg$/i.test(path.extname(file.originalname));
  const isJpgMime = file.mimetype === 'image/jpeg';

  if (isJpgExtension && isJpgMime) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg images are allowed!'));
  }
};


// Max file size: 5MB
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;
