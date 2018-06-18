app.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {

	function template(seccion, vista) {
	    let obj = {
	        name: seccion + vista,
	        files: [ 'js/' + seccion + '/frags/' + vista + '.js' ]
	    }
	    return obj
	}

    $ocLazyLoadProvider.config({
        debug: true,
        modules: [
            template('main', 'home'),
            template('main', 'servicio'),
   			template('admin', 'home'),
			template('admin', 'servicios'),
			template('admin', 'servicio'),
			template('admin', 'prospecto')
        ]
		
    });
}]);
