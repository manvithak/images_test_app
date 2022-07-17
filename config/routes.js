const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

/**
 * Controllers (route handlers).
 */
 const imageController = require('../controllers/image-controller');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.resolve(__dirname, '..'), 'uploads'))
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.')[1]
    const uniqueImageFile = 'master_'+ Date.now() + '.' + extension
    console.log("Unique File name generated:: ", uniqueImageFile)
    cb(null, uniqueImageFile)
  }
})

const upload = multer({ storage:  storage});

router.post('/api/image', upload.single('image'), imageController.uploadImage)
router.get('/api/image', imageController.getImages)
router.get('/api/image/:imageId', imageController.getResizedImages)
router.get('/api/image/:imageId/:width', imageController.getSpecificResizedImage)


module.exports = router;