const express = require('express');
const MCP23017 = require('node-mcp23017');
const DS18B20 = require('ds18b20-raspi');
const mcpadc3002 = require('mcp-spi-adc');
const { exec } = require('child_process');
const axios = require('axios');


// Express app
var app = express();
// Use public directory
app.use(express.static('www'));

const ds18b20_acuario = '28-3c01b5562c1b';
const ds18b20_Ext = '28-0000025f0d97';

const FILTRO = 0;
const BOMBA = 1;
const AIRE = 2;
const LUZ = 3;
const LUZESP = 4;
const MEDIDA = 5;
const AUX = 6;
const CALENTADOR = 7;


var AmpsRMS = 0;
var valorPH = 0;

const mcp = new MCP23017({
     address: 0x24, //default: 0x20
     device: '/dev/i2c-1', // '/dev/i2c-1' on model B | '/dev/i2c-0' on model A
     debug: true //default: false
});


app.get('/',  (req, res) => {
     res.sendFile(__dirname + '/www');
});

app.get('/luzespon', (req, res) => {

     console.log(`luzespon = ${req.query}`);
     localStorage.setItem('luzesp', 'on');
     mcp.digitalWrite(LUZESP, mcp.LOW);
     // Answer
     res.send('ON');

});

app.get('/luzespoff', (req, res) => {

     console.log(`luzespoff = ${req}`);
     localStorage.setItem('luzesp', 'off');
     mcp.digitalWrite(LUZESP, mcp.HIGH);

     res.send('OFF');
     // Answer

});

app.get('/luzon', (req, res) => {

     console.log(`luzon = ${req}`);
     localStorage.setItem('luz', 'on');
     mcp.digitalWrite(LUZ, mcp.LOW);
     // Answer
     res.send('ON');

});

app.get('/luzoff', (req, res) => {

     console.log(`luzoff = ${req}`);
     localStorage.setItem('luz', 'off');
     mcp.digitalWrite(LUZ, mcp.HIGH);

     res.send('OFF');
     // Answer

});


app.get('/filtron', (req, res) => {

     console.log(`filtro on = ${req}`);
     localStorage.setItem('filtro', 'on');
     mcp.digitalWrite(FILTRO, mcp.HIGH);
     // Answer
     res.send('ON');

});

app.get('/filtroff', (req, res) => {

     console.log(`filtro off = ${req}`);
     localStorage.setItem('filtro', 'off');
     mcp.digitalWrite(FILTRO, mcp.LOW);

     res.send('OFF');
     // Answer

});

app.get('/bombaon', (req, res) => {

     console.log(`bombaon = ${req}`);
     localStorage.setItem('bomba', 'on');
     mcp.digitalWrite(BOMBA, mcp.HIGH);
     // Answer
     res.send('ON');

});

app.get('/bombaoff', (req, res) => {

     console.log(`bombaoff = ${req}`);
     localStorage.setItem('bomba', 'off');
     mcp.digitalWrite(BOMBA, mcp.LOW);

     res.send('OFF');
     // Answer

});

app.get('/aireon', (req, res) => {

     console.log(`aireon = ${req}`);
     localStorage.setItem('aire', 'on');
     mcp.digitalWrite(AIRE, mcp.LOW);
     // Answer
     res.send('ON');

});

app.get('/aireoff', (req, res) => {

     console.log(`aireoff = ${req}`);
     localStorage.setItem('aire', 'off');
     mcp.digitalWrite(AIRE, mcp.HIGH);

     res.send('OFF');
     // Answer

});

app.get('/auxon', (req, res) => {

     console.log(`auxon = ${req}`);
     localStorage.setItem('aux', 'on');
     mcp.digitalWrite(AUX, mcp.LOW);
     // Answer
     res.send('ON');

});

app.get('/auxoff', (req, res) => {

     console.log(`auxoff = ${req}`);
     localStorage.setItem('aux', 'off');
     mcp.digitalWrite(AUX, mcp.HIGH);

     res.send('OFF');
     // Answer

});

app.get('/medidaon', (req, res) => {

     console.log(`medidaon = ${req}`);
     localStorage.setItem('medida', 'on');
     mcp.digitalWrite(MEDIDA, mcp.LOW);
     // Answer
     res.send('ON');

});

app.get('/medidaoff', (req, res) => {

     console.log(`medidaoff = ${req}`);
     localStorage.setItem('medida', 'off');
     mcp.digitalWrite(MEDIDA, mcp.HIGH);

     res.send('OFF');
     // Answer

});

app.get('/calentadoron', (req, res) => {

     console.log(`calentadoron = ${req}`);
     localStorage.setItem('calentador', 'on');
     mcp.digitalWrite(CALENTADOR, mcp.LOW);
     // Answer
     res.send('ON');

});

app.get('/calentadoroff', (req, res) => {

     console.log(`calentadoroff = ${req}`);
     localStorage.setItem('calentador', 'off');
     mcp.digitalWrite(CALENTADOR, mcp.HIGH);

     res.send('OFF');
     // Answer

});




app.get('/temp', (req, res) => {



     let temp = DS18B20.readC(ds18b20_acuario, 2);
     console.log("Temperatura  = %d", +temp);

     const respuesta = {

          sensor: "Acuario Interior",
          temperatura: +temp
     };

     res.send(respuesta);

});


app.get('/ph', (req, res) => {

     axios.get('http://192.168.1.252/ph/')
          .then(response => {
               console.log("Respuesta axios: " + response.data);

               valorPH = response.data.substring(6, 10)


               console.log("ph = %d", valorPH);

               const respuesta = {

                    sensor: "Valor PH",
                    ph: +valorPH
               };

               res.send(respuesta);

          })
          .catch(error => {

               const respuesta = {

                    sensor: "Valor PH",
                    ph: +valorPH
               };

               res.send(respuesta);


               console.log("Error AXIOS: " + error);
          });



});

app.get('/tds', (req, res) => {

     axios.get('http://192.168.1.252/tds/')
          .then(response => {
               console.log("Respuesta axios: " + response.data);

               valorTDS = response.data.substring(7, 10)

               console.log("tds = %d", valorTDS);

               const respuesta = {

                    sensor: "Valor TDS",
                    tds: +valorTDS
               };

               res.send(respuesta);

          })
          .catch(error => {

               const respuesta = {

                    sensor: "Valor TDS",
                    tds: +valorTDS
               };

               res.send(respuesta);


               console.log("Error AXIOS: " + error);
          });


});

app.get('/tempext', (req, res) => {



     let tempExt = DS18B20.readC(ds18b20_Ext, 2);
     console.log("Temperatura Exterior = %d", +tempExt);

     const respuesta = {

          sensor: "exterior",
          temperatura: +tempExt
     };

     res.send(respuesta);


});

app.get('/estado', (req, res) => {

     console.log("Lectura Estado");

     const respuesta = {

          "aire": localStorage.getItem('aire'),
          "aux": localStorage.getItem('aux'),
          "luzesp": localStorage.getItem('luzesp'),
          "luz": localStorage.getItem('luz'),
          "bomba": localStorage.getItem('bomba'),
          "filtro": localStorage.getItem('filtro'),
          "calentador": localStorage.getItem('calentador'),
          "medida": localStorage.getItem('medida')
     };

     res.send(respuesta);

});


app.get('/reboot', (req, res) => {

     console.log("Reboot");


     res.send("OK");


     exec('reboot', (error, stdout, stderr) => {


          if (error !== null) {
               console.log('exec error: ', error);
               return;
          }

          console.log('stdout: ', stdout);
          console.log('stderr: ', stderr);


     });

});




function readAdc() {


     return new Promise(resolve => {

          const sensorCorriente = mcpadc3002.openMcp3002(0, { speedHz: 20000 }, (err) => {


               if (err) throw err;

               try {
                    sensorCorriente.read((err, reading) => {
                         if (err) throw err;

                         resolve(reading.rawValue);

                    });

               } catch (err) {
                    console.log("Errr lectura ADC");
               }

          });

     });

}

 const  readAdcZero =  async () => {

     var readValue = 0;
     var minValue = 1024;
     var maxValue = 0;
     var result = 0;



     let start = Date.now();
     do {


          readValue = await readAdc();
          //console.log("Read %d",readValue);

          if (readValue > maxValue) {
               /*record the maximum sensor value*/
               maxValue = readValue;
          }
          if (readValue < minValue) {
               /*record the maximum sensor value*/
               minValue = readValue;
          }

     } while (Date.now() - start <= 1000);


     result = ((maxValue - minValue) * 3.3) / 1024.0;

     let mVperAmp = 66;
     let Voltage = result;
     let VRMS = (Voltage / 2.0) * 0.707;
     AmpsRMS = ((VRMS * 1000) / mVperAmp) - 0.3;


     console.log("Amperios %d", AmpsRMS);

}



app.get('/corriente', (req, res) => {


     try {
          readAdcZero();

     } catch (err) {

          console.log("Error Lectura ADC");
     }

     const respuesta = {

          sensor: "corriente",
          corriente: + AmpsRMS

     };

     res.send(respuesta);


});



/*const tempSensor0 = mcpadc3002.openMcp3002(0, {speedHz: 20000}, (err) => {
  if (err) throw err;
 
  setInterval(() => {
    tempSensor0.read((err, reading) => {
      if (err) throw err;
 
      const val=(reading.value * 3.3 - 0.5) * 100;
      console.log(`Canal 0:${val}`);
    });
  }, 1000);
});

const tempSensor1 = mcpadc3002.openMcp3002(1, {speedHz: 20000}, (err) => {
  if (err) throw err;
 
  setInterval(() => {
    tempSensor1.read((err, reading) => {
      if (err) throw err;
      const val=(reading.value * 3.3 - 0.5) * 100;
      console.log(`Canal 1:${val}`);
    });
  }, 1000);
});*/



for (var i = 0; i < 16; i++) {
     mcp.pinMode(i, mcp.OUTPUT);
     //mcp.pinMode(i, mcp.INPUT); //if you want them to be inputs
     //mcp.pinMode(i, mcp.INPUT_PULLUP); //if you want them to be pullup inputs
}
for (let i = 0; i < 16; i++) {
     mcp.digitalWrite(i, mcp.HIGH);
     //mcp.pinMode(i, mcp.INPUT); //if you want them to be inputs
     //mcp.pinMode(i, mcp.INPUT_PULLUP); //if you want them to be pullup inputs
}



console.log("Local Storage ...");
if (typeof localStorage === "undefined" || localStorage === null) {
     const LocalStorage = require('node-localstorage').LocalStorage;
     localStorage = new LocalStorage('./scratch');
}

if (localStorage.getItem('aire') === 'on')
     mcp.digitalWrite(AIRE, mcp.LOW);
if (localStorage.getItem('aire') === 'off')
     mcp.digitalWrite(AIRE, mcp.HIGH);


if (localStorage.getItem('luzesp') === 'on')
     mcp.digitalWrite(LUZESP, mcp.LOW);
if (localStorage.getItem('luzesp') === 'off')
     mcp.digitalWrite(LUZESP, mcp.HIGH);

if (localStorage.getItem('luz') === 'on')
     mcp.digitalWrite(LUZ, mcp.LOW);
if (localStorage.getItem('luz') === 'off')
     mcp.digitalWrite(LUZ, mcp.HIGH);

if (localStorage.getItem('aux') === 'on')
     mcp.digitalWrite(AUX, mcp.LOW);
if (localStorage.getItem('aux') === 'off')
     mcp.digitalWrite(AUX, mcp.HIGH);

if (localStorage.getItem('medida') === 'on')
     mcp.digitalWrite(MEDIDA, mcp.LOW);
if (localStorage.getItem('medida') === 'off')
     mcp.digitalWrite(MEDIDA, mcp.HIGH);

if (localStorage.getItem('calentador') === 'on')
     mcp.digitalWrite(CALENTADOR, mcp.LOW);
if (localStorage.getItem('calentador') === 'off')
     mcp.digitalWrite(CALENTADOR, mcp.HIGH);

if (localStorage.getItem('bomba') === 'on')
     mcp.digitalWrite(BOMBA, mcp.LOW);
if (localStorage.getItem('bomba') === 'off')
     mcp.digitalWrite(BOMBA, mcp.HIGH);

// Start server
var server = app.listen(3000, () => {
     console.log('Control Acuario ,puerto %d', server.address().port);
});


