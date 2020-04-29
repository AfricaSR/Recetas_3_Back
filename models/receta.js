//Se carga el paquete mongoose para generar un modelo de recetas
var mongoose = require('mongoose');

//mongoose se encargará de guardar un elemento receta con la estructura que definamos aquí
//Posteriormente hará las consultas a las recetas basándose en este modelo
module.exports = mongoose.model('Receta', {
    titulo: String,
    preparacion: String,
    imagen: String,
    ingredientes: Array,
    comentarios: Array
});