'use strict';
module.exports = (sequelize, DataTypes) => {
  const Campsite = sequelize.define('Campsite', {
    name: DataTypes.STRING,
    park: DataTypes.STRING,
    description: DataTypes.TEXT,
    pricePerDay: DataTypes.INTEGER,
    location: DataTypes.STRING
  }, {});
  Campsite.associate = function(models) {
    Campsite.hasMany(models.Booking, { foreignKey: "campsiteId"});
    Campsite.hasMany(models.Reviw, { foreignKey: "campsiteId"});
  };
  return Campsite;
};
