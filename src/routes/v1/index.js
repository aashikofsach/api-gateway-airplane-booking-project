const express = require("express");
const { infoController } = require("../../controllers");
const userRouter = require("./user-router");

const router = express.Router();

router.get("/info", infoController.info);
router.use("/signup", userRouter);

module.exports = router;
