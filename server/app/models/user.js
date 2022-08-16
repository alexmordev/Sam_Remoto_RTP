'use strict';

module.exports = (sequelize, DataTypes) => {

  const user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: "El nombre tiene que ser minimamente de dos caracteres"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "El email tiene que ser un correo valido",
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 255],
          msg: "La contraseña tiene que tener minimamente 6 caracteres"
        }
      }
    },
  
  }, {
    tableName: "users"
  });

  user.associate = function(models) {
    // user.hasMany(models.contadores, { as: "contadores", foreignKey: "userId" })
    user.belongsToMany(models.Role, { as: "roles", through: "user_role",foreignKey: "user_id" })
  };

  //Comprobación de que el usuario es administrador
  user.isAdmin = (roles) =>{
    let tempoArray = [];
    roles.forEach(role => tempoArray.push(role.role));
    return tempoArray.includes('admin');
  }

  return user;
};