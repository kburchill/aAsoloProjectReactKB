'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    userId: DataTypes.INTEGER,
    dateStart: DataTypes.DATE,
    dateEnd: DataTypes.DATE,
    campsiteId: DataTypes.INTEGER
  }, {});
  Booking.associate = function(models) {
		Booking.belongsTo(models.User, { foreignKey: "userId" });
		Booking.belongsTo(models.Campsite, { foreignKey: "campsiteId" });
  };
  return Bookings;
};
