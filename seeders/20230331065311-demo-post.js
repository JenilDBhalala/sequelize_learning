'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'posts',
      [
        {
          caption: 'this is first post',
          location: 'surat',
          likes: 30293,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          caption: 'this is second post',
          location: 'nadiad',
          likes: 102902,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  }
};
