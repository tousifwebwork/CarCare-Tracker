const express = require("express");
const router = express.Router();
const loginRouter = require("../controller/loginController");

router.get("/", loginRouter.getLogin);
router.post("/", loginRouter.postLogin);

module.exports = router;
