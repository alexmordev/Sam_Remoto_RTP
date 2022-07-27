'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contadores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contadores.init({
    sam: DataTypes.STRING,
    tarjeta: DataTypes.STRING,
    c00: DataTypes.STRING,
    c01: DataTypes.STRING,
    c02: DataTypes.STRING,
    c03: DataTypes.STRING,
    c04: DataTypes.STRING,
    c05: DataTypes.STRING,
    c06: DataTypes.STRING,
    c07: DataTypes.STRING,
    c08: DataTypes.STRING,
    c09: DataTypes.STRING,
    c10: DataTypes.STRING,
    c11: DataTypes.STRING,
    c12: DataTypes.STRING,
    c13: DataTypes.STRING,
    c14: DataTypes.STRING,
    c15: DataTypes.STRING,
    c16: DataTypes.STRING,
    c17: DataTypes.STRING,
    c18: DataTypes.STRING,
    c19: DataTypes.STRING,
    c20: DataTypes.STRING,
    c21: DataTypes.STRING,
    c22: DataTypes.STRING,
    c23: DataTypes.STRING,
    c24: DataTypes.STRING,
    c25: DataTypes.STRING,
    c26: DataTypes.STRING,
    estatus: DataTypes.STRING,
    movimiento: DataTypes.STRING,
    folio: DataTypes.STRING,
    fecha_hora: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'contadores',
  });
  return contadores;
};