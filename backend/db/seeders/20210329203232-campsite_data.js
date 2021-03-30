'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Campsites', [
      {
        name: 'Rusty Dog',
        park: 'Rocky Mountain National Park',
        location: 'Colorado',
        description: 'Beautiful campground for those rusty dogs',
        pricePerDay: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Silly Dog',
        park: 'Yellowstone National Park',
        location: 'Wyoming',
        description: 'Beautiful campground for those silly dogs',
        pricePerDay: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Happy Dog',
        park: 'Yosemite National Park',
        location: 'California',
        description: 'Beautiful campground for those happy dogs',
        pricePerDay: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Campsites', null, {});
  }
};
