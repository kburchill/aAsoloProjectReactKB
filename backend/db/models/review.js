'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    campsiteId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};