var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Servicio = sequelize.define('servicio', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre : Sequelize.STRING,
        descripcion : Sequelize.TEXT,
        status : Sequelize.INTEGER

    })

    return Servicio;

};

module.exports = ex;
