'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Imgurls', [
        {
        campsiteId: 1,
        imgurl: '/images/IMG_1354.jpeg'
        },
        {
        campsiteId: 2,
        imgurl: '/images/IMG_1354.jpeg'
        },
        {
        campsiteId: 3,
        imgurl: '/images/C8361B55-80C4-4330-917C-C452946E3313_1_105_c.jpeg'
        }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Imgurls', null, {});

  }
};
