const Customer = require('../app/models/customer');
const repository = require('../repositories/customer-repository');
const authService = require('../services/auth-service');

////Usaremos o método customerRegister abaixo para que a inserção utilize o
////generateHash do Model Customer
// exports.post = function (req, res){
//     const customer = new Customer();
//     customer.name = req.body.name;
//     customer.email = req.body.email;
//     customer.password = req.body.password;

//     // console.log(req.body);

//     customer.save(function(error){
//         if(error)
//             res.send(`Erro ao tentar salvar um novo customer , ${error}`);
        
//         res.status(201).json({message: 'customer inserido com sucesso'});
//     });
// }

exports.getAll = function(req, res){
    Customer.find(function(err, customers){
        if(err)
            res.send(err);

        res.status(200).json({
            message: "retorno ok de todos os customers",
            allProducts: customers
        });
    });
}

exports.getById = function(req, res){
    const id = req.params.customerId;
    Customer.findById(id, function(err, customer){
        if (err){
            res.status(500).json({
                message: "Erro ao tentar encontrar customer; ID mal formado"
            });
        }else if(customer == null){
            res.status(400).json({
                message: "customer não encontrado para o id passado"
            });
        }else{
            res.status(200).json({
                message: "customer encontrado",
                customer: customer
            });
        }
    });
}

exports.customerRegister = async (req, res) =>{
    try {
        await repository.register(req.body.name, req.body.email, req.body.password);
        res.status(201).json({message:"usuário registrado com sucesso"});
    } catch (error) {
        res.status(500).json({message: "erro ao tentar criar um novo usuário"});
    }
}

exports.authenticate = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email:req.body.email,
            password:req.body.password
        });

        if(!customer){
            res.status(404).send({message: 'Usuário ou senha inválidos'});
            return;
        }
        const token = await authService.generateToken({
            id: customer.id,
            email: customer.email,
            name: customer.name,
        });

        res.status(201).send({
            token: token,
            data:{
                email:customer.email,
                name:customer.name
            }
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            error: error
        });
    }
}