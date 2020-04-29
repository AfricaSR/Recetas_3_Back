//Inicialización e importación de paquetes
var express = require('express');
var app = express();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
var port = process.env.PORT || 3000; //El servidor correrá sobre el puerto 3000

// Configuracion para acceder a la base de datos en MongoDB
mongoose.connect('mongodb://recetas_3:recetas@localhost:27017/recetas_3', { useNewUrlParser: true, useUnifiedTopology: true });

//Con este paquete se podrán responder las request que se manden desde el servicio de Angular
app.use(cors({ origin: 'http://localhost:4200' }));

//Se indica cómo se va decodificar la información enviada
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port);

//Cargamos los endpoints
require('./routes/routes')(app);

//Se imprime el estado del servidor por consola
console.log("APP por el puerto " + port);
