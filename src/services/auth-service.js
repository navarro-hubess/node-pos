const jwt = require('jsonwebtoken');
require('dotenv-safe').config();

exports.generateToken = async (data) => {
    return jwt.sign(data, process.env.SALT_KEY, {expiresIn: "1d"}); 
}

exports.decodeToken = async (token) =>{
    const data = await jwt.verify(token, process.env.SALT_KEY);
    return data;
}

//Função de Middleware 
exports.authorize = async (req, res, next) => {
    //buscar o token no body, no query string ou no headers
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    //Encontrou o token?
    if(!token){
        res.status(401).json({
            message:"Acesso Restrito"
        });
    }else{
        //Se achou, verificar 
        jwt.verify(token, process.env.SALT_KEY, function(error, decode){
            if(error){
                res.status(401).json({
                    message: "token inválido",
                    Error: error
                });
            }else{
                //token válido, portanto, continua a aplicação.
                next();
            }
        });
    }
}

