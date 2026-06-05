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
    return jwt;
  } catch (error) {
    console.log("error in sign in function ", error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new AppError("Token not found ", StatusCodes.UNAUTHORIZED);
    }
    const response = await Auth.verifyToken(token);
    // why below we have to get user ....
    console.log("yaha hai response", response)
    const user = await userRepository.get(response.id);
    if (!user) {
      throw new AppError("user not found ", StatusCodes.NOT_FOUND);
    }
    return user.id ;
  } catch (error) {
    if(error instanceof AppError)
    {
      throw error;
    }
    if(error.name=="JsonWebTokenError")
      throw new AppError("Invalid JSON WebToken", StatusCodes.UNAUTHORIZED)
    if(error.name =="TokenExpiredError")
      throw new AppError("JWT Token Expired ",StatusCodes.UNAUTHORIZED )
    console.log("isAuthenticate function mein error ", error);
    throw error ;
  }
}

module.exports = {
  createUser,
  signIn,
  isAuthenticated
};
