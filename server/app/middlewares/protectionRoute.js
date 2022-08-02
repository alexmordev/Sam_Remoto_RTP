const { user } = require('../models/index')
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
// const {roles} = require('../database/migrations/20220605233756-create-role')


const validarRole = (req, res, next) => {


    if (!req.headers.authorization) {
        res.status(401).json({ message: "Acceso no autorizado!!", code: 401 });
    } else {

        //Comprobar la valides de este token

        let token = req.headers.authorization.split(" ")[1];

        //Comprobare la valides de este token-callback
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                res.status(500).json({ message: "Oops, ocurrio un problema con tu token!!", err })

            } else {

                //Comprobar la valides de este token
                user.findByPk(decoded.user.id, { include: "roles" }).then(user => {

                    // console.log(user.roles);    

                    if (user.id !== 1) {
                        return res.send({ msg: 'Lo sentimos, no tienes permisos de administrador!!' })
                    }
                    req.user = user;
                    next();
                })
            }
        })
    }
}

module.exports = {
    validarRole
}