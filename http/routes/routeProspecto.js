var express = require('express');
var routeProspecto = express.Router();

var x = require("../controllers/controllerProspecto");

routeProspecto.route('/data/prospecto')
        .get(x.read)
        .post(x.create);

routeProspecto.route('/data/prospecto/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeProspecto;