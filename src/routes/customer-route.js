const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer-controller');

//Rotas para Customer
//Post=> localhost:3000/api/customers
router.post('/', customerController.customerRegister);

//Post=> localhost:3000/api/customers para receber um Token
router.post('/auth', customerController.authenticate);

//GetAll=> localhost:3000/api/customers
router.get('/', customerController.getAll);

//GetById=> localhost:3000/api/customers/ID
router.get('/:customerId', customerController.getById);

//Put=> localhost:3000/api/customers/ID
//router.put('/:productId', customerController.put);

//Delete=> localhost:3000/api/customers/ID
//router.delete('/:productId', customerController.delete);

module.exports = router;