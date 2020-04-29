// Se carga el controlador de recetas para indicarle con qué endpoints se van a ejecutar sus funciones
var Controller = require('../controllers/recetaController');

module.exports = function(app) {

    // Devuelve todas las Recetas
    app.get('/recetas', Controller.getRecetas);
    // Devuelve todas las Recetas que se ajusten a los parámetros
    app.get('/recetas/search', Controller.getRecetasSearch);
    // Devuelve todas las Recetas ordenadas
    app.get('/recetas/order', Controller.getRecetasOrder);
    // Crea una nueva Receta
    app.post('/receta', Controller.setReceta);
    // Modifica los datos de una Receta
    app.put('/receta/:receta_id', Controller.updateReceta);
    // Borra una Receta
    app.delete('/receta/:receta_id', Controller.removeReceta);
    // Agrega un comentario
    app.post('/receta/:receta_id/comentario', Controller.setComentario);
    // Genera el backup
    app.get('/recetas/backup', Controller.getBackup);
    // Envia el backup
    app.get('/backups/:backup', Controller.sendBackup);

};