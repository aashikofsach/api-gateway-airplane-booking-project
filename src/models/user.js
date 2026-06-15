'use strict';
const {
  Model
} = require('sequelize');

const {ServerConfig} = require("../config/")
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role ,{through : "User_Role"})
    }
  }
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
      validate :{
        isEmail : true
      }
    },
    password:{
      type :  DataTypes.STRING,
      allowNull : false,
      validate : {
        len : [3,10]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
// sequelize.addHook("beforeCreate", async (User)=>{

//   console.log("user value before entering in Db", User);

//  const encryptedPassword = await bcrypt.hashSync(User.password , +ServerConfig.SALT_ROUND);
//  User.password = encryptedPassword

//   console.log("User object after password getting encrypted ", User)

// })
// above way is working, but its global hook and runs for every create operation in our app , ( ineffective approach )

User.beforeCreate(async (user)=>{
  console.log("user value before password getting encrypted",)
  user.password = await bcrypt.hash(user.password, +ServerConfig.SALT_ROUND);
  console.log("user value after password getting encrypted", user)
})
  return User;
};