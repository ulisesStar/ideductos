var express = require('express');
var routeServicio = express.Router();

var x = require("../controllers/controllerServicio");

routeServicio.route('/data/servicio')
        .get(x.read)
        .post(x.create);

routeServicio.route('/data/servicio/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

routeServicio.route('/data/Subservicios/:idServicio')
        .get(x.Subservicios);

routeServicio.route('/data/obtenerDeServicio/:idServicio')
		.get(x.obtenerDeServicio);

routeServicio.route('/data/servicio/imagen/:id')
        .get(x.imagen);


module.exports = routeServicio;
