const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ServerConfig } = require("../../config/");

async function checkPassword(plainPassword, encryptedPassword) {
  try {
    return bcrypt.compare(plainPassword, encryptedPassword);
  } catch (error) {
    throw error;
  }
}

async function createToken(input) {
  try {
    return jwt.sign(input, ServerConfig.JWT_SECRET, {
      expiresIn: ServerConfig.JWT_EXPIRY,
    });
  } catch (error) {
    console.log("error in create token function", error);
    throw error ;
  }
}

async function verifyToken(token)
{
    return jwt.verify(token, ServerConfig.JWT_SECRET);

}

module.exports = {
  checkPassword,
  createToken,
  verifyToken
};
