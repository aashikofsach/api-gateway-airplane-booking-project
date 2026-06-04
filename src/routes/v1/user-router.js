const express = require("express");
const { UserController } = require("../../controllers");
// const { CityMiddleware } = require("../../middleware");

const router = express.Router();

router.post(
  "/signup",
  UserController.createUser,
);

router.post(
  "/signin",
  UserController.signIn,
);
// router.get("/", airplaneController.getAirplanes);
// router.get("/:id", airplaneController.getAirplane);
// router.delete("/:id",cityController.destroyCity);
// router.patch("/:id",cityController.updateCity) ;

module.exports = router;
     