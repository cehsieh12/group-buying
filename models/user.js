'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  // User.associate = function (models) {
  //   // associations can be defined here
  //   User.hasMany(models.Group)
  //   User.hasMany(models.Join)
  // };
  return User;
};