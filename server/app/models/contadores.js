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
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    sam:{
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    tarjeta:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    c00:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    c01:{
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c02: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c03: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c04: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c05: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c06: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c07: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c08: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c09: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c10: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c11: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c12: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c13: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c14: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c15: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c16: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c17: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c18: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c19: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c20: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c21: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c22: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c23: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c24: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c25: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    c26: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    estatus: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    secuencia: {
      type:DataTypes.STRING,
      allowNull:false,
    }, 

  }, {
    sequelize,
    modelName: 'contadores',
  });
  return contadores;
};