const { user } = require('../../models/index');
const bcrypt = require('bcrypt');
const authConfig = require('../../../config/auth');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      
      user.create({ 
        name: "Mario Israel Jiménez Amaro",
        email: "omarsc97nuevo@gmail.com",
        password: bcrypt.hashSync("rtp2019++", +authConfig.rounds),
    
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