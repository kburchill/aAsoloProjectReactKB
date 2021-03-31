'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Parks', [
      {
        name: 'Rocky Mountain National Park',
        state: 'Colorado',
        city: 'Estes Park',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Yellowstone National Park',
        state: 'Wyoming',
        city: 'Jackson Hole',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Yosemite National Park',
        state: 'California',
        city: 'Yosemite Village',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Zion National Park',
        state: 'Utah',
        city: 'Zion',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Grand Canyon National Park',
        state: 'Arizona',
        city: 'Grand Canyon Village',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Parks', null, {});

  }
};
