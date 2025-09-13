const express = require('express');
const router = express.Router();
const mainController = require("../controller/maincontroller");
const deleteController = require('../controller/deleteController');

router.get('/', mainController.mainget);
router.delete('/delete/:id', deleteController.deleteCar);

module.exports = router;