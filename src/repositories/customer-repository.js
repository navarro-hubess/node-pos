const Customer = require('../app/models/customer');
const authService = require('../services/auth-service');

exports.register = async(name, mail, pass) => {
    const result = await Customer.find({email: mail});

    if(result.length > 0){
        throw{
            status: 400,
            message: "Usuário já existente"
        };
    }
    const customer = new Customer();
    customer.name = name;
    customer.email = mail;
    customer.password = customer.generateHash(pass);

    customer.save( (err, res) => {
        if(err){
            return res.send({
                success: false,
                message: "Error on save"
            });
        }
    });
    return {custom: customer};
}

exports.authenticate = async(data) => {

    const customer = await Customer.findOne({
        email: data.email,
    });

    if(customer.validPassword(data.password)){
        return customer;    
    }
    return null;
}