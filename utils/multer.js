const multer = require('multer');
const path = require('path');

checkFileType = (file, cb) => {
    // Allowed ext
    const filetypes = /webp|jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if(extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Error: File type is not supported", false);
    }
}

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
    limits: {fileSize: 1000000} // limit 1MB
});
