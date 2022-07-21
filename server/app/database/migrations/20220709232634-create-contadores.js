'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contadores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sam: {
        type: Sequelize.STRING
      },
      tarjeta: {
        type: Sequelize.STRING
      },
      c00: {
        type: Sequelize.STRING
      },
      c01: {
        type: Sequelize.STRING
      },
      c02: {
        type: Sequelize.STRING
      },
      c03: {
        type: Sequelize.STRING
      },
      c04: {
        type: Sequelize.STRING
      },
      c05: {
        type: Sequelize.STRING
      },
      c06: {
        type: Sequelize.STRING
      },
      c07: {
        type: Sequelize.STRING
      },
      c08: {
        type: Sequelize.STRING
      },
      c09: {
        type: Sequelize.STRING
      },
      c10: {
        type: Sequelize.STRING
      },
      c11: {
        type: Sequelize.STRING
      },
      c12: {
        type: Sequelize.STRING
      },
      c13: {
        type: Sequelize.STRING
      },
      c14: {
        type: Sequelize.STRING
      },
      c15: {
        type: Sequelize.STRING
      },
      c16: {
        type: Sequelize.STRING
      },
      c17: {
        type: Sequelize.STRING
      },
      c18: {
        type: Sequelize.STRING
      },
      c19: {
        type: Sequelize.STRING
      },
      c20: {
        type: Sequelize.STRING
      },
      c21: {
        type: Sequelize.STRING
      },
      c22: {
        type: Sequelize.STRING
      },
      c23: {
        type: Sequelize.STRING
      },
      c24: {
        type: Sequelize.STRING
      },
      c25: {
        type: Sequelize.STRING
      },
      c26: {
        type: Sequelize.STRING
      },
      estatus: {
        type: Sequelize.STRING
      },
      comando: {
        type: Sequelize.STRING
      },
      folio: {
        type: Sequelize.STRING
      },
      fecha_hora: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contadores');
  }
};