'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    minNum: DataTypes.INTEGER,
    maxNum: DataTypes.INTEGER,
    category: DataTypes.STRING,
    number: DataTypes.INTEGER,
    deadline: DataTypes.DATE,
    addr: DataTypes.STRING,
    contactInfo: DataTypes.STRING,
    content: DataTypes.STRING,
    pid: DataTypes.INTEGER,
    initiatorId:DataTypes.INTEGER,
  },{});
  return Group;
};