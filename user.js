'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Fname: DataTypes.STRING,
    Lname: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    Birth :DataTypes.STRING,
    email: DataTypes.STRING,
    sex: DataTypes.STRING,      
    password: DataTypes.STRING,
  }, {});
  // User.associate = function (models) {
  //   // associations can be defined here
  //   User.hasMany(models.Todo)
  // };
  return User;
};