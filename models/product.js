'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    p_name:DataTypes.STRING,
    category:DataTypes.STRING,
    price:DataTypes.INTEGER
  }, {});
  return Product;
};