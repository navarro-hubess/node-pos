//Importando pacotes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Configurar o app para usar o body-parser e transformar as req em JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Persistência
const connectionString2 = "mongodb+srv://pos1:posgraduacao123@cluster0.waiml.mongodb.net/BDPos1?retryWrites=true&w=majority";
const connectionString = "mongodb+srv://posgraduacao123:posgraduacao123@cluster0.jquuj.mongodb.net/bdpos?retryWrites=true&w=majority";
mongoose.connect(connectionString2,  {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});

//Definir porta onde o server vai responder
const port = process.env.PORT || 3000;

//Definindo as Rotas
const router = express.Router();//intercepta todas as rotas
const productRoute = require('./src/routes/product-route');
const indexRoute = require('./src/routes/index-route');
const customerRoute = require('./src/routes/customer-route');
const loginRoute = require('./src/routes/login-route');

//Vincular a aplicação (app) com o motor de rotas 
// '/api' é o caminho padrão para as APIs REST
//rota principal
app.use('/api', indexRoute);
//rota para produto
app.use('/api/produtos/', productRoute);
//rota para customer
app.use('/api/customers/', customerRoute);
//Rota para Login
app.use('/api/login', loginRoute);

app.listen(port, () => {
    console.log("server is up and running...on port ", port);
});

