const express = require("express");
const { UserController } = require("../../controllers");
// const { CityMiddleware } = require("../../middleware");
const { AuthRequestMiddleware } = require("../../middlewares");

const router = express.Router();

router.post(
  "/signup",
  AuthRequestMiddleware.validateAuthRequest,
  UserController.createUser,
);

router.post(
  "/signin",
  AuthRequestMiddleware.validateAuthRequest,
  UserController.signIn,
);
// router.get("/", airplaneController.getAirplanes);
// router.get("/:id", airplaneController.getAirplane);
// router.delete("/:id",cityController.destroyCity);
// router.patch("/:id",cityController.updateCity) ;

module.exports = router;
