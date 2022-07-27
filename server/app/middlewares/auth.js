const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { user } = require('../models/index')
const {error_Http} = require('../helpers/erroresHttp')

module.exports = (req,res, next) => {

    //Comprobaremos que existe el token

    if(!req.headers.authorization){
        res.status(401).json({ message: "Unauthorized access!",error_Http:error_Http.unauthorized });
    }else{

        //Comprobar la valides de este token

        let token = req.headers.authorization.split(" ")[1];

        //Comprobare la valides de este token-callback
        jwt.verify(token, authConfig.secret, (err,decoded) => {
            if ( err ){
                res.status(500).json({ message: "There was a problem generating the token!, contact the administrator", err })
                
            }else{
                req.user = decoded.user;
                user.findByPk(decoded.user.id, { include: "roles" }).then(user => {

                    // console.log(user.roles);
                    req.user = user;
                    next();
                })
            }
        })
    }
}