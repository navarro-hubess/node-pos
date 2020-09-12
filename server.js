//Importando pacotes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Configurar o app para usar o body-parser e transformar as req em JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Definir porta onde o server vai responder
const port = process.env.PORT || 3000;

//Definindo as Rotas
const router = express.Router();//intercepta todas as rotas

//Middleware
router.use(function(req, res, next){
    console.log("Interceptação pelo Middleware ok"); //LOG, Validações, Autenticações
    next();
});

router.get('/', (req, res) => res.send("rota teste ok"));

//Vincular a aplicação (app) com o motor de rotas 
// '/api' é o caminho padrão para as APIs REST
app.use('/api', router);

app.listen(port, () => {
    console.log("server is up and running...on port ", port);
});

