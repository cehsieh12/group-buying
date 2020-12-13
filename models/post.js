'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    // image:DataTypes.STRING,
    done: DataTypes.BOOLEAN,
    numberOfPeople: DataTypes.INTEGER,
    category: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    initiatorId:DataTypes.INTEGER
  }, {});
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.Post)
  };
  return Post;
};