
//*-*-*-CONEXION CON SEQUELIZE & MYSQL-*-*-*-*-*-*-*
var conector = require('./connection');

//- Modelos

var servicio = require('./db/modeloServicio')(conector);
var imagenes = require('./db/modeloImagenes')(conector);
var subservicio = require('./db/modeloSubServicio')(conector);
var prospecto = require('./db/modeloProspecto')(conector);



//- Relations

imagenes.belongsTo(servicio, {foreignKey: 'idServicio', as: 'ImagenServicio'}); 
servicio.hasMany(imagenes, {foreignKey: 'idServicio', as: 'ImagenServicio'});

imagenes.belongsTo(subservicio, {foreignKey: 'idSubServicio', as: 'ImagenSubservicio'}); 
subservicio.hasMany(imagenes, {foreignKey: 'idSubServicio', as: 'ImagenSubservicio'});

subservicio.belongsTo(servicio, {foreignKey: 'idServicio', as: 'Subservicio'}); 
servicio.hasMany(subservicio, {foreignKey: 'idServicio', as: 'Subservicio'});


module.exports.servicio = servicio;
module.exports.imagenes = imagenes;
module.exports.subservicio = subservicio;
module.exports.prospecto = prospecto;


