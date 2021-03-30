'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    campsiteId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, { foreignKey: "userId" });
    Review.belongsTo(models.Campsite, { foreignKey: "campsiteId" });
  };
  return Review;
};
