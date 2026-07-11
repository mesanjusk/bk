const multer = require('multer');

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB, generous enough for a short hero video

function fileFilter(req, file, cb) {
  if (!file.mimetype.startsWith('image/') && !file.mimetype.startsWith('video/')) {
    return cb(new Error('Only image or video files are allowed.'));
  }
  cb(null, true);
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

module.exports = upload;
