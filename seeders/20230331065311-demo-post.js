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
        },
        {
          caption: 'this is first post by another user',
          location: 'ahemadabad',
          likes: 45623,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          caption: 'this is second post by another user',
          location: 'gandhinagar',
          likes: 54647,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts');
    await queryInterface.sequelize.query('ALTER TABLE posts AUTO_INCREMENT = 1;');
  }
};
