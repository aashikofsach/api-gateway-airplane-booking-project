const { UserService } = require("../services/");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createUser(req, res) {
  try {
    console.log("Body is", req.body);
    const resposne = await UserService.createUser({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = resposne;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createUser
};
