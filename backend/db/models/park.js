'use strict';
module.exports = (sequelize, DataTypes) => {
  const Park = sequelize.define('Park', {
    name: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    postalcode: DataTypes.INTEGER
  }, {});
  Park.associate = function(models) {
    // associations can be defined here
  };
  return Park;
};