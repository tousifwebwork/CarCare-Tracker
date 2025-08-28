const express = require('express');
const router = express.Router();
const addController  = require('../controller/addcontroller');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });


router.get('/', addController.addget);
router.post('/', upload.single('image'), addController.addpost);

module.exports = router;
