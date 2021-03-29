'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define('Booking', {
    userId: DataTypes.INTEGER,
    dateStart: DataTypes.DATE,
    dateEnd: DataTypes.DATE,
    campsiteId: DataTypes.INTEGER
  }, {});
  Bookings.associate = function(models) {
    // associations can be defined here
  };
  return Bookings;
};
