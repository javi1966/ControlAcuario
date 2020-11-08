

const toast = function (msg) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>" + msg + "</h3></div>")
        .css({
            display: "block",
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
            "color": "whitesmoke"
        })

        .appendTo("body").delay(4000)
        .fadeOut(400, function () {
            $(this).remove();
        });
};

//*********************************************************************************************************
let bReleLuzEsp = false;
let bReleLuz = false;
let bFiltro = false;
let bBomba = false;
let bCalentador = false;
let bAire = false;
let bMedida = false;
let bAux = false;

const app = {


    _DEBUG_: true,
    deviceWidth: 0,
    deviceHeight: 0,
    gaugeTDS: new Gauge({
        renderTo: 'gaugeTDS',
        //width: 250,
        //height: 250,
        glow: true,
        units: 'ppm',
        title: 'TDS',
        minValue: 0,
        maxValue: 500,
        valueFormat: { int: 3 },
        majorTicks: ['0', '100', '200', '300', '400', '500'],
        minorTicks: 2,
        strokeTicks: false,
        highlights: [
            //{from: 0, to: 2, color: 'rgba(0,   255, 0, .15)'},
            { from: 0, to: 100, color: 'rgba(0, 0, 255, .15)' },
            { from: 100, to: 200, color: 'rgba(0, 0, 255, .25)' },
            { from: 200, to: 300, color: 'rgba(255, 0,225, .25)' },
            { from: 300, to: 400, color: 'rgba(255, 0,  0, .25)' },
            { from: 400, to: 500, color: 'rgba(255, 0,  0, .25)' }
        ],
        colors: {
            plate: '#222',
            majorTicks: '#f5f5f5',
            minorTicks: '#ddd',
            title: '#fff',
            units: '#ccc',
            numbers: '#eee',
            needle: { start: 'rgba(240, 128, 128, 1)', end: 'rgba(255, 160, 122, .9)' }
        }
    }),

    gaugeTemp: new Gauge({
        renderTo: 'gaugeTemp',
        //width: 250,
        //height: 250,
        glow: true,
        units: 'ºC',
        title: 'Temperatura',
        minValue: 0,
        maxValue: 60,
        valueFormat: { int: 2, dec: 1 },
        majorTicks: ['0', '10', '20', '30', '40', '50', '60'],
        minorTicks: 2,
        strokeTicks: false,
        highlights: [
            //{from: 0, to: 2, color: 'rgba(0,   255, 0, .15)'},
            { from: 0, to: 10, color: 'rgba(0, 0, 255, .15)' },
            { from: 10, to: 20, color: 'rgba(0, 0, 255, .25)' },
            { from: 20, to: 30, color: 'rgba(255, 0,225, .25)' },
            { from: 30, to: 40, color: 'rgba(255, 0,  0, .25)' },
            { from: 40, to: 50, color: 'rgba(255, 0,  0, .25)' },
            { from: 50, to: 60, color: 'rgba(255, 0,  0, .25)' }
        ],
        colors: {
            plate: '#222',
            majorTicks: '#f5f5f5',
            minorTicks: '#ddd',
            title: '#fff',
            units: '#ccc',
            numbers: '#eee',
            needle: { start: 'rgba(240, 128, 128, 1)', end: 'rgba(255, 160, 122, .9)' }
        }
    }),

    gaugePH: new Gauge({
        renderTo: 'gaugePH',
        //width: 250,
        //height: 250,
        glow: true,
        units: 'º',
        title: 'Valor PH',
        minValue: 1,
        maxValue: 14,
        valueFormat: { int: 2, dec: 2 },
        majorTicks: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
        minorTicks: 2,
        strokeTicks: false,
        highlights: [

            { from: 1, to: 6, color: 'rgba(255, 0, 0, 1)' },
            { from: 6, to: 8, color: 'rgba(0, 255, 0, .25)' },
            { from: 8, to: 14, color: 'rgba(255, 255,0, .5)' }

        ],
        colors: {
            plate: '#222',
            majorTicks: '#f5f5f5',
            minorTicks: '#ddd',
            title: '#fff',
            units: '#ccc',
            numbers: '#eee',
            needle: { start: 'rgba(240, 128, 128, 1)', end: 'rgba(255, 160, 122, .9)' }
        }
    }),


    gaugeText: new Gauge({
        renderTo: 'gaugeText',
        //width: 250,
        //height: 250,
        glow: true,
        units: 'ºC',
        title: 'Tempe. Ext.',
        minValue: 0,
        maxValue: 60,
        valueFormat: { int: 2, dec: 1 },
        majorTicks: ['0', '10', '20', '30', '40', '50', '60'],
        minorTicks: 2,
        strokeTicks: false,
        highlights: [
            //{from: 0, to: 2, color: 'rgba(0,   255, 0, .15)'},
            { from: 0, to: 10, color: 'rgba(0, 0, 255, .15)' },
            { from: 10, to: 20, color: 'rgba(0, 0, 255, .25)' },
            { from: 20, to: 30, color: 'rgba(255, 0,225, .25)' },
            { from: 30, to: 40, color: 'rgba(255, 0,  0, .25)' },
            { from: 40, to: 50, color: 'rgba(255, 0,  0, .25)' },
            { from: 50, to: 60, color: 'rgba(255, 0,  0, .25)' }
        ],
        colors: {
            plate: '#222',
            majorTicks: '#f5f5f5',
            minorTicks: '#ddd',
            title: '#fff',
            units: '#ccc',
            numbers: '#eee',
            needle: { start: 'rgba(240, 128, 128, 1)', end: 'rgba(255, 160, 122, .9)' }
        }
    }),



    // Application Constructor
    initialize: () => {
        app.bindEvents();
        console.log("log:initialize");

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {

        document.addEventListener('deviceready', this.onDeviceReady, false);
        $(document).on('pageshow', '#main', this.onPageShow);
        swLuzEsp.change = app.ControlReles;
        swLuz.change = app.ControlReles;
        swBomba.change = app.ControlReles;
        swFiltro.change = app.ControlReles;
        swCalentador.change = app.ControlReles;
        swAire.change = app.ControlReles;
        swMedida.change = app.ControlReles;
        swAux.change = app.ControlReles;
        btnReboot.onclick = app.Reboot;
        btnAbout.onclick = app.about;
        btnCerrar.onclick = app.Cerrar;


    },
    onPageShow: () => {
        app.deviceWidth = (window.orientation === 0) ? window.screen.width : window.screen.height;
        app.deviceHeight = (window.orientation === 90) ? window.screen.width : window.screen.height;
        console.log("Orientacion:" + window.orientation);
        console.log("PixelRatio: " + window.devicePixelRatio);
        console.log("Width: " + app.deviceWidth / window.devicePixelRatio);
        console.log("Heigth: " + app.deviceHeight / window.devicePixelRatio);


        app.gaugeTDS.draw();

        app.gaugeTemp.draw();

        app.gaugePH.draw();

        app.gaugeText.draw();

        app.mideTemperatura();

        app.mideTDS();

        app.midePH();

        app.mideCorriente();

        setInterval(() => {
            app.mideTemperatura();
        }, 360000);


        setInterval(() => {
            app.mideTDS();
        }, 60000);


        setInterval(() => {
            app.midePH();
        }, 60000);



        setInterval(() => {
            app.mideCorriente();
        }, 7000);

        app.estado();


    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: () => {

        toast("Iniciando...");
        // app.receivedEvent('deviceready');

        $(document).bind("resume", app.onResumedApp);
        console.log("onDeviceReady");
    },

    mideTemperatura: function () {

        // $.get("/temp40",(data) => {app.gaugeT40.setValue(data.temperatura)});
        $.get("/temp", (data) => { app.gaugeTemp.setValue(data.temperatura) });
        $.get("/tempext", (data) => { app.gaugeText.setValue(data.temperatura) });

        console.log("Mide Temperatura");
    },

    midePH: function () {

        $.get("/ph", (data) => {
            app.gaugePH.setValue(data.ph);
            console.log("Mide PH: " + data.ph);

        });


    },

    mideTDS: function () {

        $.get("/tds", (data) => {
            app.gaugeTDS.setValue(data.tds);
            console.log("Mide TDS: " + data.tds);
        });


    },


    mideCorriente: () => {

        $.get("/corriente", (data) => {

            $("#idCorriente").text(data.corriente.toFixed(1));

        });
    },

    ControlReles: function (e) {

        var id = $(this).attr('id');
        //navigator.notification.beep(1);

        //toast("Pulsado Rele "+id);

        switch (id) {

            case "swLuzEsp":

                bReleLuzEsp = !bReleLuzEsp;
                $("#lblLuzEsp").css(bReleLuzEsp?{"color":"white"}:{"color":"gray"});

                $.get(bReleLuzEsp ? "/luzespon" : "/luzespoff")

                    .done(function (data) {
                       
                        toast("Luz Esp: " + data);
                        console.log("Luz Esp.: " + data);
                    })
                    .fail(function (error) {
                        alert("Error: " + error.responseText);
                    });



                break;

            case "swLuz":

                bReleLuz = !bReleLuz;

                $("#lblLuz").css(bReleLuz?{"color":"white"}:{"color":"gray"});

                $.get(bReleLuz ? "/luzon" : "/luzoff")


                    .done(function (data) {
                        // function (data,status) {
                        toast("Luz " + data);
                        console.log("Luz " + data);
                    })
                    .fail(function (error) {
                        alert("Error: " + error.responseText);
                    });


                break;

            case "swBomba":

                bBomba = !bBomba;

                $("#lblBomba").css(bBomba?{"color":"white"}:{"color":"gray"});

                $.get(bBomba ? "/bombaon" : "/bombaoff")
                    .done((data) => {
                        // function (data,status) {
                        toast("Bomba " + data);
                        console.log("Bomba : " + data);
                    })
                    .fail(function (error) {
                        alert("Error: " + error.responseText);
                    });

                break;

            case "swFiltro":

                bFiltro = !bFiltro;
                
                $("#lblFiltro").css(bFiltro?{"color":"white"}:{"color":"gray"});

                $.get(bFiltro ? "/filtron" : "/filtroff")

                    .done((data) => {
                        // function (data,status) {
                        toast("Filtro  " + data);
                        console.log("Filtro : " + data);
                    })
                    .fail((error) => {
                        alert("Error: " + error.responseText);
                    });

                break;
            case "swCalentador":

                bCalentador = !bCalentador;

                $("#lblCalentador").css(bCalentador?{"color":"white"}:{"color":"gray"});


                $.get(bCalentador ? "/calentadoron" : "/calentadoroff")

                    .done(function (data) {
                        // function (data,status) {
                        toast("Calentador: " + data);
                        console.log("Calentador: " + data);
                    })
                    .fail(function (error) {
                        alert("Error: " + error.responseText);
                    });


                break;


            case "swAire":

                bAire ^= true;

                $("#lblAire").css( bAire?{"color":"white"}:{"color":"gray"});

                $.get(bAire ? "/aireon" : "/aireoff")

                    .done(function (data) {

                        toast("Aire: " + data);
                        console.log("Aire: " + data);
                    })
                    .fail(function (error) {
                        alert("Error: " + error.responseText);
                    });

                break;

            case "swMedida":

                bMedida ^= true;

                $("#lblMedida").css( bMedida?{"color":"white"}:{"color":"gray"});

                $.get(bMedida ? "/medidaon" : "/medidaoff")

                    .done(function (data) {

                        toast("Medida: " + data);
                        console.log("Medida: " + data);
                    })
                    .fail(function (error) {
                        alert("Error: " + error.responseText);
                    });

                break;


            case "swAux":

                bAux ^= true;

                $("#lblAux").css(bAux?{"color":"white"}:{"color":"gray"});

                $.get(bAux ? "/auxon" : "/auxoff")

                    .done(function (data) {
                        
                        toast("Aux: " + data);
                        console.log("Aux: " + data);
                    })
                    .fail(function (error) {
                        alert("Error: " + error.responseText);
                    });

                break;


            default:
                break;
        }


        console.log("Pulsacion Reles");

    },

    estado: () => {

        $.get("/estado")


            .done(function (data) {

                $('#swLuzEsp').val(data.luzesp).flipswitch('refresh');
                $('#swLuz').val(data.luz).flipswitch('refresh');
                $('#swBomba').val(data.bomba).flipswitch('refresh');
                $('#swFiltro').val(data.filtro).flipswitch('refresh');
                $('#swCalentador').val(data.calentador).flipswitch('refresh');
                $('#swAire').val(data.aire).flipswitch('refresh');
                $('#swMedida').val(data.medida).flipswitch('refresh');
                $('#swAux').val(data.aux).flipswitch('refresh');  

                $("#lblLuzEsp").css(data.luzesp === 'on'?{"color":"white"}:{"color":"gray"});
                $("#lblLuz").css(data.luz === 'on'?{"color":"white"}:{"color":"gray"});
                $("#lblBomba").css(data.bomba === 'on'?{"color":"white"}:{"color":"gray"});
                $("#lblFiltro").css(data.filtro === 'on'?{"color":"white"}:{"color":"gray"});
                $("#lblCalentador").css(data.calentador === 'on'?{"color":"white"}:{"color":"gray"});
                $("#lblAire").css(data.aire === 'on'?{"color":"white"}:{"color":"gray"});
                $("#lblMedida").css(data.medida === 'on'?{"color":"white"}:{"color":"gray"});  
                $("#lblAux").css(data.aux === 'on'?{"color":"white"}:{"color":"gray"});


                console.log(`Estado: Aire ${data.aire},Aux ${data.aux},Bomba ${data.bomba}
                     ,Filtro ${data.filtro},Luz ${data.luz},LuzEsp ${data.luzesp},Calentador ${data.calentador} `);
            })
            .fail(function (error) {
                alert("Error: " + error.responseText);
            });


    },
    Reboot: () => {

        $.get("/reboot")


            .done((data) => {

                toast("Rebot OK");

                console.log(`Estado Reboot ${data}`);
            })
            .fail(function (error) {
                alert("Error: " + error.responseText);
            });

    },


    about: () => {
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
