var express = require('express');
var routeImagenes = express.Router();

var x = require("../controllers/controllerImagenes");

routeImagenes.route('/data/imagenes')
        .get(x.read)
        .post(x.create);

routeImagenes.route('/data/imagenes/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeImagenes;
