const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const authService = require('../services/auth-service');

//Rotas para Produto
//Post=> localhost:3000/api/produtos
router.post('/', authService.authorize ,productController.post);

//GetAll=> localhost:3000/api/produtos
router.get('/', productController.getAll);

//GetById=> localhost:3000/api/produtos/ID
router.get('/:productId', productController.getById);

//Put=> localhost:3000/api/produtos/ID
router.put('/:productId', productController.put);

//Delete=> localhost:3000/api/produtos/ID
router.delete('/:productId', productController.delete);

module.exports = router;
