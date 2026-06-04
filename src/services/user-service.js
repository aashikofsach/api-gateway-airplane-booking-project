const { StatusCodes } = require("http-status-codes");

const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const bcrypt = require("bcrypt");
const { Auth } = require("../utils/common");

const userRepository = new UserRepository();

async function createUser(data) {
  try {
    const user = await userRepository.create(data);
    return user;
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
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

async function signIn(data) {
  try {
    const user = await userRepository.findUserByEmail(data.email);
    if (!user) {
      throw new AppError("user not found ", StatusCodes.NOT_FOUND);
    }
    const passwordMatch = await Auth.checkPassword(
      data.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new AppError("password not matched ", StatusCodes.BAD_REQUEST);
    }
    const jwt = await Auth.createToken({ id: user.id, email: user.email });
    return jwt ; 
  } catch (error) {
    console.log("error in sign in function ", error)
    if(error instanceof AppError)
      throw error
    throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createUser,
  signIn,
};
