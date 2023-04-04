'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'jenil',
          email: 'jenil123@gmail.com',
          age: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'bhavin',
          email: 'bhavin123@gmail.com',
          age: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ravi',
          email: 'ravi123@gmail.com',
          age: 23,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'chirag',
          email: 'chirag123@gmail.com',
          age: 24,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users');
    await queryInterface.sequelize.query('ALTER TABLE users AUTO_INCREMENT = 1;');
  }
};
