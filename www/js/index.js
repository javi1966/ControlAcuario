

const toast = function (msg) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>" + msg + "</h3></div>")
            .css({display: "block",
                opacity: 0.95,
                position: "fixed",
                padding: "7px",
                "text-align": "center",
                width: "270px",
                left: ($(window).width() - 284) / 2,
                top: $(window).height() / 2,
                "-webkit-box-shadow": "5px 5px 5px 0px rgba(102,102,102,0.65)",
                "-moz-box-shadow": "5px 5px 5px 0px rgba(102,102,102,0.65)",
                "-ms-box-shadow": "5px 5px 5px 0px rgba(102,102,102,0.65)",
                "box-shadow": "5px 5px 5px 0px rgba(102,102,102,0.65)",
                "color":"whitesmoke"
            })

            .appendTo("body").delay(4000)
            .fadeOut(400, function () {
                $(this).remove();
            });
};

//*********************************************************************************************************
let bReleLuz40 = false;
let bReleLuz80 = false;
let bFiltro80  = false;
let bFiltro40  = false;
let bCalentador      = false;
let bAire       = false;   

const app = {
    
    
    _DEBUG_: true,
    deviceWidth: 0,
    deviceHeight: 0,
    gaugeT40 : new Gauge({
            renderTo: 'gaugeT40',
            //width: 250,
            //height: 250,
            glow: true,
            units: 'ºC',
            title: 'Temp. 40l',
            minValue: 0,
            maxValue: 60,
            valueFormat: {int: 2, dec: 1},
            majorTicks: ['0', '10', '20', '30', '40', '50' ,'60'],
            minorTicks: 2,
            strokeTicks: false,
            highlights: [
                //{from: 0, to: 2, color: 'rgba(0,   255, 0, .15)'},
                {from: 0, to: 10, color: 'rgba(0, 0, 255, .15)'},
                {from: 10, to: 20, color: 'rgba(0, 0, 255, .25)'},
                {from: 20, to: 30, color: 'rgba(255, 0,225, .25)'},
                {from: 30, to: 40, color: 'rgba(255, 0,  0, .25)'},
                {from: 40, to: 50, color: 'rgba(255, 0,  0, .25)'},
                {from: 50, to: 60, color: 'rgba(255, 0,  0, .25)'}
            ],
            colors: {
                plate: '#222',
                majorTicks: '#f5f5f5',
                minorTicks: '#ddd',
                title: '#fff',
                units: '#ccc',
                numbers: '#eee',
                needle: {start: 'rgba(240, 128, 128, 1)', end: 'rgba(255, 160, 122, .9)'}
            }
         }), 

       gaugeT80 : new Gauge({
            renderTo: 'gaugeT80',
            //width: 250,
            //height: 250,
            glow: true,
            units: 'ºC',
            title: 'Temp. 80l',
            minValue: 0,
            maxValue: 60,
            valueFormat: {int: 2, dec: 1},
            majorTicks: ['0', '10', '20', '30', '40', '50' ,'60'],
            minorTicks: 2,
            strokeTicks: false,
            highlights: [
                //{from: 0, to: 2, color: 'rgba(0,   255, 0, .15)'},
                {from: 0, to: 10, color: 'rgba(0, 0, 255, .15)'},
                {from: 10, to: 20, color: 'rgba(0, 0, 255, .25)'},
                {from: 20, to: 30, color: 'rgba(255, 0,225, .25)'},
                {from: 30, to: 40, color: 'rgba(255, 0,  0, .25)'},
                {from: 40, to: 50, color: 'rgba(255, 0,  0, .25)'},
                {from: 50, to: 60, color: 'rgba(255, 0,  0, .25)'}
            ],
            colors: {
                plate: '#222',
                majorTicks: '#f5f5f5',
                minorTicks: '#ddd',
                title: '#fff',
                units: '#ccc',
                numbers: '#eee',
                needle: {start: 'rgba(240, 128, 128, 1)', end: 'rgba(255, 160, 122, .9)'}
            }
         }), 

       gaugePH : new Gauge({
            renderTo: 'gaugePH',
            //width: 250,
            //height: 250,
            glow: true,
            units: 'º',
            title: 'Valor PH',
            minValue: 1,
            maxValue: 14,
            valueFormat: {int: 2, dec: 2},
            majorTicks: ['1', '2', '3', '4', '5', '6' ,'7','8','9','10','11','12','13','14'],
            minorTicks: 2,
            strokeTicks: false,
            highlights: [
               
                {from: 1, to: 6, color: 'rgba(255, 0, 0, 1)'},
                {from: 6, to: 8, color: 'rgba(0, 255, 0, .25)'},
                {from: 8, to: 14, color: 'rgba(255, 255,0, .5)'}
               
            ],
            colors: {
                plate: '#222',
                majorTicks: '#f5f5f5',
                minorTicks: '#ddd',
                title: '#fff',
                units: '#ccc',
                numbers: '#eee',
                needle: {start: 'rgba(240, 128, 128, 1)', end: 'rgba(255, 160, 122, .9)'}
            }
         }), 


      gaugeText : new Gauge({
            renderTo: 'gaugeText',
            //width: 250,
            //height: 250,
            glow: true,
            units: 'ºC',
            title: 'Temp. Ext.',
            minValue: 0,
            maxValue: 60,
            valueFormat: {int: 2, dec: 1},
            majorTicks: ['0', '10', '20', '30', '40', '50' ,'60'],
            minorTicks: 2,
            strokeTicks: false,
            highlights: [
                //{from: 0, to: 2, color: 'rgba(0,   255, 0, .15)'},
                {from: 0, to: 10, color: 'rgba(0, 0, 255, .15)'},
                {from: 10, to: 20, color: 'rgba(0, 0, 255, .25)'},
                {from: 20, to: 30, color: 'rgba(255, 0,225, .25)'},
                {from: 30, to: 40, color: 'rgba(255, 0,  0, .25)'},
                {from: 40, to: 50, color: 'rgba(255, 0,  0, .25)'},
                {from: 50, to: 60, color: 'rgba(255, 0,  0, .25)'}
            ],
            colors: {
                plate: '#222',
                majorTicks: '#f5f5f5',
                minorTicks: '#ddd',
                title: '#fff',
                units: '#ccc',
                numbers: '#eee',
                needle: {start: 'rgba(240, 128, 128, 1)', end: 'rgba(255, 160, 122, .9)'}
            }
         }),



    // Application Constructor
    initialize:   () =>  {
        app.bindEvents();


        console.log("log:initialize");

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents:  function ()  {

        document.addEventListener('deviceready', this.onDeviceReady, false);
        $(document).on('pageshow', '#main', this.onPageShow);
        swLuz40.change = app.ControlReles;
        swLuz80.change = app.ControlReles;
        swFil40.change = app.ControlReles;
        swFil80.change = app.ControlReles;
        swCalentador.change = app.ControlReles;
        swAire.change=app.ControlReles;
        btnReboot.onclick=app.Reboot;
        btnAbout.onclick = app.about;
        btnCerrar.onclick = app.Cerrar;



        

        console.log("log:bindEvents"+localStorage.getItem('ReleLuz40'));
    },
    onPageShow:   () => {
        app.deviceWidth = (window.orientation === 0) ? window.screen.width : window.screen.height;
        app.deviceHeight = (window.orientation === 90) ? window.screen.width : window.screen.height;
        console.log("Orientacion:" + window.orientation);
        console.log("PixelRatio: " + window.devicePixelRatio);
        console.log("Width: " + app.deviceWidth / window.devicePixelRatio);
        console.log("Heigth: " + app.deviceHeight / window.devicePixelRatio);


         app.gaugeT40.draw();

         app.gaugeT80.draw();
         
         app.gaugePH.draw();

         app.gaugeText.draw();

         app.mideTemperatura();

         app.midePH();

         app.mideCorriente();
//
          setInterval(() =>  {
                app.mideTemperatura();
         },360000);

           setInterval(() =>  {
                app.midePH();
         }, 60000);

         setInterval(() =>  {
                app.mideCorriente();
         }, 7000);

        app.estado();
       
       
        

        console.log("log:onPageShow"+localStorage.getItem('ReleLuz40'));
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady:  () => {

        toast("Iniciando...");
        // app.receivedEvent('deviceready');

        
        
        $(document).bind("resume", app.onResumedApp);
        console.log("onDeviceReady");
    },

    mideTemperatura: function () {
      
      $.get("/temp40",(data) => {app.gaugeT40.setValue(data.temperatura)});
      $.get("/temp80",(data) => {app.gaugeT80.setValue(data.temperatura)});
      $.get("/tempext",(data) => {app.gaugeText.setValue(data.temperatura)});

      console.log("Mide Temperatura");
    },

    midePH: function () {
      
      $.get("/ph",(data) => {app.gaugePH.setValue(data.ph)});

      console.log("Mide PH");
    },


    mideCorriente : () => {

    	$.get("/corriente", (data) => {

    		$("#idCorriente").text(data.corriente.toFixed(1));

    	});
    },

    ControlReles:   function (e)  {

        var id = $(this).attr('id');
        //navigator.notification.beep(1);

        //toast("Pulsado Rele "+id);

        switch (id) {

            case "swLuz40":

                bReleLuz40 = !bReleLuz40;

                

                $.get(bReleLuz40 ? "/luz40on": "/luz40off")
                        
                       .done(function (data) {
                       // function (data,status) {
                            toast("Pulsado: " + data);
                            console.log("Rele 1: " + data);
                        })
                        .fail(function(error) {
                               alert("Error: "+error.responseText);
                         });


                
                break;

           case "swLuz80":

                bReleLuz80 = !bReleLuz80;

               

                $.get(bReleLuz80 ? "/luz80on" : "/luz80off")
                       
                        
                        .done(function (data) {
                       // function (data,status) {
                            toast("Luz 80 " + data);
                            console.log("Luz 80 " + data);
                        })
                        .fail(function(error) {
                               alert("Error: "+error.responseText);
                         });

               
                break;

            case "swFil40":

                 bFiltro40 = !bFiltro40;

                 

                $.get(bFiltro40 ? "/filtro40on": "/filtro40off")
                        .done( (data) => {
                       // function (data,status) {
                            toast("Filtro 40 "+data);
                            console.log("Filtro 40 : " + data);
                        })
                        .fail(function(error) {
                                alert("Error: "+error.responseText);
                         });
                                
                break;

            case "swFil80":

               bFiltro80 = !bFiltro80;

              

                $.get(bFiltro80 ?"/filtro80on":"/filtro80off")
                        
                        .done( (data) => {
                       // function (data,status) {
                          toast("Filtro 80 "+ data);
                          console.log("Filtro 80: " + data);
                        })
                        .fail((error) => {
                                alert("Error: "+error.responseText);
                         });

                break;
            case "swCalentador":

                bCalentador = !bCalentador;

                

                $.get(bCalentador ? "/aireon" : "/aireoff")
                      
                        
                        .done(function (data){
                       // function (data,status) {
                            toast("Calentador: " + data );
                            console.log("Calentador: " + data);
                        })
                        .fail(function(error) {
                                alert("Error: "+error.responseText);
                         });

                
                break;

            
             case "swAire":

               // bAux = !bAux;

                bAire ^= true;

                

                $.get(bAire ? "/auxon" : "/auxoff")
                      
                
                        .done(function (data){
                       
                            toast("Aire: " + data );
                            console.log("Aire: " + data);
                        })
                        .fail(function(error) {
                                alert("Error: "+error.responseText);
                         });

                break;    
                
           
            default:
                break;
        }


         console.log("Pulsacion Reles");
   
    },

    estado: () => {
 
               $.get("/estado")
                      
                        
                 .done(function (data){

                       $('#swLuz40').val(data.luz40).flipswitch('refresh');
                       $('#swLuz80').val(data.luz80).flipswitch('refresh');
                       $('#swFil40').val(data.fil40).flipswitch('refresh');
                       $('#swFil80').val(data.fil80).flipswitch('refresh');
                       $('#swCalentador').val(data.aire).flipswitch('refresh');
                       $('#swAire').val(data.aux).flipswitch('refresh');   

                           
                    console.log(`Estado: Aire ${data.aire},Aux ${data.aux},Fitro40 ${data.fil40},Filtro80 ${data.fil80},Luz40 ${data.luz40},Luz80 ${data.luz80} `);
                  })
                  .fail(function(error) {
                      alert("Error: "+error.responseText);
                     });


    },
    Reboot:() => {

    	 $.get("/reboot")
                      
                        
                 .done( (data) => {

                    toast("Rebot OK");
                           
                    console.log(`Estado Reboot ${data}`);
                  })
                  .fail(function(error) {
                      alert("Error: "+error.responseText);
                   });

    },


    about:  () => {
        // $("#popupAbout").show();
        $('#popupAbout').popup('open');
        console.log("about");
        // $("#pRes").html("Resol. "+app.deviceHeight / window.devicePixelRatio + "x" + app.deviceWidth / window.devicePixelRatio);
    }
    ,
    Cerrar: function () {
        
        console.log("Cerrar");

       window.close();

    },
    onConfirmExit: function (buttonIndex) {
        if (buttonIndex === 1) {

           
            console.log("onConfirmExit");
        }
    }
    ,
    onResumedApp: function () {
        toast("Salida De Pausa de APP");
    }


};
