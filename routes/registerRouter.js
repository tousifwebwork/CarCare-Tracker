const express = require("express");
const router = express.Router();
const RegisterRouter = require("../controller/registerController");

router.get("/", RegisterRouter.getRegister);
router.post("/", RegisterRouter.postRegister);

module.exports = router;
