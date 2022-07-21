'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sam_card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sam_card.init({
    ns_tarjeta: DataTypes.STRING,
    environment_log: DataTypes.STRING,
    events_log: DataTypes.STRING,
    contracts_log: DataTypes.STRING,
    purchase_log: DataTypes.STRING,
    fecha_hora: DataTypes.DATE,
    folio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sam_card',
  });
  return sam_card;
};