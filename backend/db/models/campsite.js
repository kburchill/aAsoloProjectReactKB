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
    // associations can be defined here
  };
  return Campsite;
};