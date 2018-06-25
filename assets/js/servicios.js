app.service('Servicio', function() {

    this.obtener = () => axios('/data/servicio')
    this.one = (id) => axios('data/servicio/' + id)
    this.editar = (servicio) => axios.put('/data/servicio/' + servicio.id, servicio)
    this.crear = (servicio) => axios.post('/data/servicio', servicio)
    this.eliminar = function(id) { return axios.delete('/data/servicio/' + id) }
    this.TodosSubservicios = function(id) { return axios('/data/Subservicios/' + id) }

    this.imagen = (id) => axios('/data/servicio/imagen/' + id)



});

app.service('SubServicio', function() {

    this.obtener = () => axios('/data/subservicio')
    this.one = (id) => axios('data/subservicio/' + id)
    this.editar = (subservicio) => axios.put('/data/subservicio/' + subservicio.id, subservicio)
    this.crear = (subservicio) => axios.post('/data/subservicio', subservicio)
    this.eliminar = function(id) { return axios.delete('/data/subservicio/' + id) }

});

app.service('Imagenes', function() {

    this.obtener = () => axios('/data/imagenes')
    this.one = (id) => axios('data/imagenes/' + id)
    this.editar = (imagen) => axios.put('/data/imagen/' + imagen.id, imagen)
    this.crear = (imagen) => axios.post('/data/imagenes', imagen)
    this.eliminar = function(id) { return axios.delete('/data/imagenes/' + id) }
    this.obtenerDeServicio = function(id) { return axios('/data/obtenerDeServicio/' + id) }
    this.obtenerDeSubServicio = function(id) { return axios('/data/obtenerDeSubServicio/' + id) }




});

app.service('Prospectos', function() {

    this.obtener = () => axios('/data/prospecto')
    this.one = (id) => axios('data/prospecto/' + id)
    this.editar = (prospecto) => axios.put('/data/prospecto/' + prospecto.id, prospecto)
    this.crear = (prospecto) => axios.post('/data/prospecto', prospecto)
    this.eliminar = function(id) { return axios.delete('/data/prospecto/' + id) }

});
