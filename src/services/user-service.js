const {StatusCodes} = require("http-status-codes")

const {UserRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");

const userRepository = new UserRepository() ;


async function createUser(data) {
  try {
    const user = await userRepository.create(data);
    return user;
  } catch (error) {
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
      console.log("jai maata di of createUser service  ");
      let explaination = [];
      error.errors.forEach((err) => {
        explaination.push(err.message);
      });

      console.log("jai maata di jai bajrang bali", explaination);

      throw new AppError(explaination, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot able ot create new user ",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

module.exports ={
    createUser
}