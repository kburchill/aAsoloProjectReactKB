'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Reviews', [
        {
        campsiteId: 1,
        content: "This was a very nice campsite, would return",
        userId: 1,
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('People', null, {});
  }
};
