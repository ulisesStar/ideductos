var app = angular.module('myapp');

app.controller('homeCtrl', function($scope, $rootScope, $http, $mdDialog, mdDialog, $timeout, $mdSidenav, $state, $stateParams, Servicio, Prospectos) {


    var self = this;

    self.nombreServicio = "Servicios";
    self.entregado = true;

    var controller = new ScrollMagic.Controller();

    var horizontalSlide = new TimelineMax()
    // animate panels
    .to("#js-slideContainer", 1,   {x: "-20%"})
    .to("#js-slideContainer", 1,   {x: "-40%"})
    .to("#js-slideContainer", 1,   {x: "-60%"})


    new ScrollMagic.Scene({
      triggerElement: "#js-wrapper",
      triggerHook: "onLeave",
      duration: "400%"
    })
      .setPin("#js-wrapper")
      .setTween(horizontalSlide)
      //.addIndicators()
      .addTo(controller);

    var animacionServicios =  new TimelineLite()

    
    
    console.log($('.servicio-indivudal'))
    
    new ScrollMagic.Scene({
      triggerElement: "#servicios",
      triggerHook: "onLeave",
      duration: "400%"
    })
      //.setPin("#js-wrapper")
      .setTween(animacionServicios)
      //.addIndicators()
      .addTo(controller);

    var home = new TimelineMax()
        .from($('.cortinita'), 2, { x: "100%"})
        .from($('.imagen'), 2, {opacity: "0"}, '-=.5')
        .add('textos')
        .add('cuadros')
        .from($('.integridad-container'), 2, {x: "100%", opacity: "0"}, 'textos-=1.5')
        .from($('.ductos-container'), 2, {x: "-100%", opacity: "0"}, 'textos-=1.5')
        .from($('.cuadro.arriba'), 2, {y: "-100%", opacity: "0"}, 'cuadros-=1')
        .from($('.cuadro.abajo'), 2, {y: "100%", opacity: "0"}, 'cuadros-=1')

    TweenMax.fromTo($('.informacion'),6,{'opacity':'0',ease:Quad.easeOut},{'opacity':'1',ease:Quad.easeOut});

    var scrollMagicController = new ScrollMagic.Controller({vertical: false});

    [
    {seccion: '#home',   clase : '.texto-container.integridad-container h1',from : '20%',  to : '-20%'    },
    {seccion: '#home',   clase : '.texto-container.ductos-container h1',from : '20%',  to : '-20%'    },
    {seccion: '#home',   clase : '.cuadro-container .cuadro.arriba',from : '20%',  to : '-20%'    },
    {seccion: '#home',   clase : '.cuadro-container .cuadro.abajo',from : '20%',  to : '-20%'    },
    {seccion: '#home',   clase : '.imagen',from : '20%',  to : '-20%'    },
    {seccion: '#servicios',   clase : '.tituloServicios h1',from : '20%',  to : '-20%'    },
    {seccion: '#cultura',   clase : '.tituloCultura',from : '20%',  to : '-20%'    },
    {seccion: '#cultura',   clase : '.parteIzquierda .textoVision',from : '20%',  to : '-20%'    },
    {seccion: '#cultura',   clase : '.parteIzquierda .imagenVision',from : '20%',  to : '-20%'    },
    {seccion: '#cultura',   clase : '.parteDerecha .imagenMision',from : '20%',  to : '-120'    },
    {seccion: '#cultura',   clase : '.parteDerecha .textoMision',from : '20%',  to : '-20%'    },
    ].forEach(n => new ScrollMagic.Scene({
        triggerElement: n.seccion,
        triggerHook: .5,
        duration: $(n.seccion).width()
    })
    .setTween(
        new TimelineLite()
          .from(n.clase, 1 , {x: n.from, ease:Power0.easeNone})
          .to(n.clase, 1 , {x: n.to, ease:Power0.easeNone})
    )
    .addTo(scrollMagicController)
    //.addIndicators()
    )

    class Contenedor {
            constructor(){
                this.items = []
            }
            obtener(){
                Servicio.obtener()
                .then(res => self.servicios.items = res.data.map(n => new Servicios_(n)))
                .then(res => individual())
                .then(() => $scope.$digest())
            }

            click(algo){
              console.log(algo)
              $state.go('servicio', {id : algo.id});
            }

            muestra(algo){
              self.servicios.items.forEach(n =>{
                  if(n.id === algo.id){
                    n.estado = true;
                    self.background = n.imagen;
                    self.nombreServicio = n.nombre;
                    self.descripcion = n.descripcion;
                    var imagenServicio = $('.background')
                    TweenMax.fromTo(imagenServicio,1,{'opacity':'0',ease:Quad.easeOut},{'opacity':'1',ease:Quad.easeOut});
                    TweenMax.to(".capa",.5,{'width':'0',ease:Quad.easeOut});

                  }else{
                    n.estado = false;
                  }
              })

            }

            oculta(){
              TweenMax.to(".capa",.5,{'width':'100%',ease:Quad.easeOut});
              self.servicios.items.forEach(n => n.estado = true)
              self.background = " ";
              self.descripcion = null;
              self.nombreServicio = "Servicios";

            }
        }

      class Servicios_ {
          constructor(arg){
              this.id = arg.id,
              this.nombre = arg.nombre,
              this.estado = true,
              this.descripcion = arg.descripcion,
              this.imagen = arg.ImagenServicio[0]
          }
      }

      self.servicios = new Contenedor()
      self.servicios.obtener()

      class Formulario_{
        constructor(){
        } 

        nuevoProspecto(algo){
          Prospectos.crear(algo).then(res => console.log(res.data))
          self.entregado = false;
        }
      }

      self.prospecto = new Formulario_();

});
