'use strict';

//Maybe need this??
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Campsite = sequelize.define('Campsite', {
    name: DataTypes.STRING,
    parkId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    pricePerDay: DataTypes.INTEGER,
  }, {});
  Campsite.associate = function(models) {
    Campsite.hasMany(models.Booking, { foreignKey: "campsiteId"});
    Campsite.hasMany(models.Review, { foreignKey: "campsiteId"});
    Campsite.belongsTo(models.Park, { foreignKey: "parkId"});
  };
  return Campsite;
};
