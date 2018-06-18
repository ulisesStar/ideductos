var db = require('../relations');
var subservicio = db.subservicio;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    subservicio.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    subservicio.findById(id).then(function(subservicio) {
        subservicio.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    subservicio.update(data, {
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
        subservicio.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        subservicio.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};

ex.obtenerDeSubServicio = function(req, res, next) {

    var id = req.params.idSubservicio;
     subservicio.findById(id)
    .then(subservicio => subservicio.getImagenSubservicio({attributes: ['imagen']}))
    .then(result => res.status(200).jsonp(result))
};


