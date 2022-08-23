const {user} = require('../models/index')
const {contadores} = require('../models/index')

//Asociación uno a uno Sequelize
//Usuario tiene un id
//Añadir clave foranea del tipo user id a la tabla contaddores

user.hasOne(contadores);


//Añade una clave userId a la tabla contadores
contadores.belongsTo(user);