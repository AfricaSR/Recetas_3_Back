//Cargamos el modelo Receta, el paquete para crear backups y el resolver de directorios
var Receta = require('../models/receta');
var backup = require('mongodb-backup');
var path = require('path');

/*Los comentarios pueden ser una clase independiente sin modelo 
ya que para este proyecto sólo podrán generarse*/
class Comentario {
    constructor(estrellas, comentario) {
        this.estrellas = estrellas,
            this.comentario = comentario,
            this.fecha = new Date()
    }
}

// Obtiene todos los objetos Receta de la base de datos
exports.getRecetas = function(req, res) {
    Receta.find(
        function(err, receta) {
            if (err)
                res.send(err)
            res.json(receta); // devuelve todas las Recetas en JSON		
        }
    );
}

// Obtiene todos los objetos Receta cuyo título contenga el valor especificado
exports.getRecetasSearch = function(req, res) {

    Receta.find({ titulo: { $regex: req.query.titulo, $options: 'i' } },
        function(err, receta) {
            if (err)
                res.send(err)
            res.json(receta); // devuelve todas las Recetas en JSON    

        }
    );
}

// Obtiene todos los objetos Receta de la base de datos ordenados
exports.getRecetasOrder = function(req, res) {
    Receta.find({}, null, { sort: { titulo: req.query.order } },
        function(err, receta) {
            if (err)
                res.send(err)
            res.json(receta); // devuelve todas las Recetas en JSON     
        }
    );
}

// Guarda un objeto Receta en base de datos
exports.setReceta = function(req, res) {

    // Se crea el objeto Receta
    Receta.create({
            titulo: req.body.titulo,
            preparacion: req.body.preparacion,
            imagen: req.body.imagen,
            ingredientes: req.body.ingredientes,
            comentarios: req.body.comentarios
        },
        function(err, receta) {
            if (err)
                res.send(err);
            // Obtine y devuelve todas las Recetas tras crear una de ellas
            Receta.find(function(err, receta) {
                if (err)
                    res.send(err)
                res.json(receta);
            });
        });

}

// Modifica un objeto Receta de la base de datos
exports.updateReceta = function(req, res) {
    Receta.updateOne({ _id: req.params.receta_id }, {
            $set: {
                titulo: req.body.titulo,
                preparacion: req.body.preparacion,
                imagen: req.body.imagen,
                ingredientes: req.body.ingredientes,
            }
        },
        function(err, receta) {
            if (err)
                res.send(err);
            // Obtine y devuelve todas las Recetas tras crear una de ellas
            Receta.find(function(err, receta) {
                if (err)
                    res.send(err)
                res.json(receta);
            });
        });
}

// Elimina un objeto Receta de la base de Datos
exports.removeReceta = function(req, res) {
    Receta.deleteOne({ _id: req.params.receta_id }, function(err, receta) {
        if (err)
            res.send(err);
        // Obtine y devuelve todas las Recetas tras borrar una de ellas
        Receta.find(function(err, receta) {
            if (err)
                res.send(err)
            res.json(receta);
        });
    });
}

// Introduce un comentario en una receta
exports.setComentario = function(req, res) {

    let c = new Comentario(req.body.estrellas, req.body.comentario);

    Receta.findOneAndUpdate({ _id: req.params.receta_id }, { $push: { "comentarios": c } },
        function(err, receta) {
            if (err)
                res.send(err);
            // Obtine y devuelve todas las Recetas tras crear una de ellas
            Receta.find(function(err, receta) {
                if (err)
                    res.send(err)
                res.json(receta);
            });
        });

}

// Genera un Backup
exports.getBackup = function(req, res) {
    let date = new Date().getTime();
    backup({
        uri: 'mongodb://recetas_3:recetas@localhost:27017/recetas_3',
        root: __dirname + '/../backups',
        parser: 'json',
        tar: date + '.gz'

    });
    res.json('http://localhost:3000/backups/' + date + '.gz');
}

// Envía el Backup para descargarlo desde el cliente
exports.sendBackup = function(req, res) {
    res.sendFile(req.params.backup, { root: path.join(__dirname, '../backups/') });
}