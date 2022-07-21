require('dotenv').config()

module.exports = {

  // Configuracion de DB
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD ||12345,
  database: process.env.DB_DATABASE || "RTP",
  host: process.env.DB_HOST ||"localhost",
  dialect: process.env.DB_DIALECT || "postgres",

  // Configurar Seeds
  seederStorage: "sequelize",
  seederStorageTableName: "seeds",

  // Configuracion de Migrations
  migrationStorage: "sequelize",
  migrationStorageTableName: "migrations"

}
