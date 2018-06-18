var express = require('express');
var routeSubServicio = express.Router();

var x = require("../controllers/controllerSubServicio");

routeSubServicio.route('/data/subservicio')
        .get(x.read)
        .post(x.create);

routeSubServicio.route('/data/subservicio/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);


routeSubServicio.route('/data/obtenerDeSubServicio/:idSubservicio')
		.get(x.obtenerDeSubServicio);



module.exports = routeSubServicio;