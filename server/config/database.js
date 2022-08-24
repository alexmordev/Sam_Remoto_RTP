require('dotenv').config()

module.exports = {

  // Configuracion de DB
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD ||"postgres",
  database: process.env.DB_DATABASE || "calypso_app",
  host: process.env.DB_HOST || "10.10.31.179",
  dialect: process.env.DB_DIALECT || "postgres",

  // Configurar Seeds
  seederStorage: "sequelize",
  seederStorageTableName: "seeds",

  // Configuracion de Migrations
  migrationStorage: "sequelize",
  migrationStorageTableName: "migrations"

}