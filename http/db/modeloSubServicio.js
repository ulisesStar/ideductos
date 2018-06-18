var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var SubServicio = sequelize.define('subservicio', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre : Sequelize.STRING,
        descripcion : Sequelize.TEXT

    })

    return SubServicio;

};

module.exports = ex;
