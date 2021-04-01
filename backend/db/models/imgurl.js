'use strict';
module.exports = (sequelize, DataTypes) => {
  const Imgurl = sequelize.define('Imgurl', {
    campsiteId: DataTypes.INTEGER,
    imgurl: DataTypes.STRING
  }, {});
  Imgurl.associate = function(models) {
    Imgurl.belongsTo(models.Park, { foreignKey: "campsiteId"});
  };
  return Imgurl;
};
