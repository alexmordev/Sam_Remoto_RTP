const { user } = require('../../models/index');
const bcrypt = require('bcrypt');
const authConfig = require('../../../config/auth');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      
      user.create({
        name: "Mario Israel Jiménez Amaro",
        email: "mjimenez@rtp.cdmx.gob.mx",
        password: bcrypt.hashSync("mjimenez", +authConfig.rounds),
    
      }),

      user.create({
        name: "Manuel",
        email: "manuel@gmail.com",
        password: bcrypt.hashSync("123456", +authConfig.rounds),
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    
      return Promise.all([
        queryInterface.bulkDelete('contadores', null, {}),
        queryInterface.bulkDelete('users', null, {})
      ]);
  }
};