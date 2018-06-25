var db = require('../relations');
var servicio = db.servicio;
var subservicio = db.subservicio;
var imagenes = db.imagenes;

var ex = module.exports = {};


ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    servicio.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};


ex.delete = function(req, res, next) {

    var id = req.params.id;

    servicio.findById(id).then(function(servicio) {
        servicio.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};


ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    servicio.update(data, {
        where: {
            id: id
        }
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
};


ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        servicio.findById(id,{
            include: {
                model: imagenes,
                as: 'ImagenServicio',
                attributes: ['imagen']
            }
        }).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        servicio.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};

ex.imagen = (req, res, next) => servicio.findById(req.params.id)
    .then(servicio => servicio.getImagenServicio())
    .then(result => res.status(200).jsonp(result))


ex.Subservicios = function(req, res, next) {

    var idservicio = req.params.idServicio;

    servicio.findById(idservicio)
    .then(servicio => servicio.getSubservicio())
    .then(result => res.status(200).jsonp(result))
};

ex.obtenerDeServicio = function(req, res, next) {

    var idservicio = req.params.idServicio;

    servicio.findById(idservicio)
    .then(servicio => servicio.getImagenServicio())
    .then(result => res.status(200).jsonp(result))
};
