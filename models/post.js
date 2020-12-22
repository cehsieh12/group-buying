'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    done: DataTypes.BOOLEAN,
    numberOfPeople: DataTypes.INTEGER,
    category: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    initiatorId:DataTypes.INTEGER,
    currentNum:DataTypes.INTEGER
  },{});
  return Post;
};