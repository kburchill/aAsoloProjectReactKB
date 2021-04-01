'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Campsites', [
      {
        name: 'Rusty Dog',
        parkId: 1,
        description: 'Beautiful campground for those rusty dogs',
        pricePerDay: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smelly Dog',
        parkId: 1,
        description: 'Beautiful campground for those rusty dogs',
        pricePerDay: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Farting Dog',
        parkId: 1,
        description: 'Beautiful campground for those rusty dogs',
        pricePerDay: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Old Dog',
        parkId: 1,
        description: 'Beautiful campground for those rusty dogs',
        pricePerDay: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dirt Dog',
        parkId: 1,
        description: 'Beautiful campground for those rusty dogs',
        pricePerDay: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Playful Dog',
        parkId: 1,
        description: 'Beautiful campground for those rusty dogs',
        pricePerDay: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Silly Dog',
        parkId: 2,
        description: 'Beautiful campground for those silly dogs',
        pricePerDay: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Monkey Dog',
        parkId: 2,
        description: 'Beautiful campground for those silly dogs',
        pricePerDay: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sleeping Dog',
        parkId: 2,
        description: 'Beautiful campground for those silly dogs',
        pricePerDay: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Funny Dog',
        parkId: 2,
        description: 'Beautiful campground for those silly dogs',
        pricePerDay: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Happy Dog',
        parkId: 3,
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
