'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
 
      return Promise.all([
        queryInterface.bulkInsert('roles',[

          //Role admin

          { role:"admin", createdAt: new Date(),updatedAt: new Date() },//1admin

          //Role usuarios

          { role:"user", createdAt: new Date(),updatedAt: new Date() }//2user
      ],{}),

      queryInterface.bulkInsert('user_role',[

      

        { user_id: 1,role_id: 1, createdAt: new Date(),updatedAt: new Date() },//Usuario admin
        { user_id: 1,role_id: 2, createdAt: new Date(),updatedAt: new Date() },//Aparte tendra el user id_2
        { user_id: 2,role_id: 2, createdAt: new Date(),updatedAt: new Date() },//Mau solo sera el usuario

    ],{}),



      ])
  
  },

  down: (queryInterface, Sequelize) => {
    
   
     return Promise.all([
        queryInterface.bulkDelete('roles', null, {}),
        queryInterface.bulkDelete('user_role', null, {})
     ]);
  }
};
