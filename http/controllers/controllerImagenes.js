var db = require('../relations');
var imagenes = db.imagenes;


var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    imagenes.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    imagenes.findById(id).then(function(imagenes) {
        imagenes.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    imagenes.update(data, {
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
        imagenes.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        imagenes.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};