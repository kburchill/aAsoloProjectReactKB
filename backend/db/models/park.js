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
    Park.hasMany(models.Campsite, { foreignKey: "parkId"});
  };
  return Park;
};
