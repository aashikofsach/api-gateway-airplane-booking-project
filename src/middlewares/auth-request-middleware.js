const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

const { UserService } = require("../services/");

function validateAuthRequest(req, res, next) {
  if (!req.body?.email) {
    ErrorResponse.message =
      "Something went wrong, when we are doing sign/signup ";
    ErrorResponse.error = new AppError(
      ["email not found in the incoming request correctly"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body?.password) {
    ErrorResponse.message =
      "Something went wrong, when we are doing sign/signup ";
    ErrorResponse.error = new AppError(
      ["password not found in the incoming request correctly"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

async function checkAuth(req, res, next) {
  try {
    const response = await UserService.isAuthenticated(
      req.headers["x-access-token"],
    );
    console.log("info api ka response ", response)
    if (response) {
      req.user = response; // its a good practice to after successfully authenticated we feed the user id in req
      next();
    }
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }
}

module.exports = {
  validateAuthRequest,
  checkAuth,
};
