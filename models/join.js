'use strict';
module.exports = (sequelize, DataTypes) => {
  const Join = sequelize.define('Join', {
    C_id:DataTypes.INTEGER,
    G_id:DataTypes.INTEGER,
    J_initiator_id:DataTypes.INTEGER
  }, {timestamps: false});
  return Join;
};