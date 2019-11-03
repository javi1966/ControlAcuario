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



const ds18b20_40l = '28-0204917727c2';
const ds18b20_80l = '28-0000072a7e97';
const ds18b20_Ext = '28-0000025f0d97';

const LUZ40 = 4;
const LUZ80 = 5;
const FILTRO40=0;
const FILTRO80=1;
const AIRE    =2;
const AUX     =3;
var AmpsRMS=0;
var valorPH=0;
 
const mcp = new MCP23017({
  address: 0x24, //default: 0x20
  device: '/dev/i2c-1', // '/dev/i2c-1' on model B | '/dev/i2c-0' on model A
  debug: true //default: false
});


app.get('/', function (req, res) {
       res.sendfile(__dirname + '/www');
});

app.get('/luz40on',  (req, res) => {

	 console.log('luz40on = ${req}');
	 localStorage.setItem('luz40', 'on');
     mcp.digitalWrite(LUZ40, mcp.LOW); 
// Answer
     res.send('luz40on');
     
});

app.get('/luz40off', (req, res) => {

	 console.log('luz40off = ${req}');
      localStorage.setItem('luz40', 'off');
     mcp.digitalWrite(LUZ40, mcp.HIGH); 

      res.send('luz40off');
// Answer
    
});

app.get('/luz80on',  (req, res) => {

	 console.log('luz80on = ${req}');
	 localStorage.setItem('luz80', 'on');
     mcp.digitalWrite(LUZ80, mcp.LOW); 
// Answer
     res.send('luz80on');
     
});

app.get('/luz80off', (req, res) => {

	 console.log('luz80off = ${req}');
     localStorage.setItem('luz80', 'off');
     mcp.digitalWrite(LUZ80, mcp.HIGH); 

      res.send('luz80off');
// Answer
    
});


app.get('/filtro80on',  (req, res) => {

	 console.log('filtro80on = ${req}');
	 localStorage.setItem('fil80', 'on');
     mcp.digitalWrite(FILTRO80, mcp.LOW); 
// Answer
     res.send('filtro80on');
     
});

app.get('/filtro80off', (req, res) => {

	 console.log('filtro80off = ${req}');
     localStorage.setItem('fil80', 'off');
     mcp.digitalWrite(FILTRO80, mcp.HIGH); 

      res.send('filtro80off');
// Answer
    
});

app.get('/filtro40on',  (req, res) => {

	 console.log('filtro40on = ${req}');
	 localStorage.setItem('fil40', 'on');
     mcp.digitalWrite(FILTRO40, mcp.LOW); 
// Answer
     res.send('filtro40on');
     
});

app.get('/filtro40off', (req, res) => {

	 console.log('filtro40off = ${req}');
     localStorage.setItem('fil40', 'off');
     mcp.digitalWrite(FILTRO40, mcp.HIGH); 

      res.send('filtro40off');
// Answer
    
});

app.get('/aireon',  (req, res) => {

	 console.log(`aireon = ${req}`);
	 localStorage.setItem('aire', 'on');
     mcp.digitalWrite(AIRE, mcp.LOW); 
// Answer
     res.send('aireon');
     
});

app.get('/aireoff', (req, res) => {

	 console.log(`aireoff = ${req}`);
     localStorage.setItem('aire', 'off');
     mcp.digitalWrite(AIRE, mcp.HIGH); 

      res.send('aireoff');
// Answer
    
});

app.get('/auxon',  (req, res) => {

	 console.log(`auxon = ${req}`);
	 localStorage.setItem('aux', 'on');
     mcp.digitalWrite(AUX, mcp.HIGH); 
// Answer
     res.send('auxon');
     
});

app.get('/auxoff', (req, res) => {

	 console.log(`auxoff = ${req}`);
     localStorage.setItem('aux', 'off');
     mcp.digitalWrite(AUX, mcp.LOW); 

      res.send('auxoff');
// Answer
    
});


app.get('/temp40', (req, res) => {

	 

     let temp40 = DS18B20.readC(ds18b20_40l,2);
     console.log("Temperatura 40l = %d",+temp40);

     const respuesta = {

     	sensor:"Acuario 40l",
     	temperatura:+temp40
     };

     res.send(respuesta);
    
});

app.get('/temp80', (req, res) => {

	 

     let temp80 = DS18B20.readC(ds18b20_80l,2);
     console.log("Temperatura 80l = %d",+temp80);

     const respuesta = {

     	sensor:"Acuario 80l",
     	temperatura:+temp80
     };

     res.send(respuesta);

     
    
});


app.get('/ph', (req, res) => {

	


     axios.get('http://192.168.1.252/ph/')
         .then(response => {
                  console.log("Respuesta axios: "+response.data);

                  valorPH=response.data.substring(6,10)
                   
                 
                  console.log("ph = %d",valorPH);

                   const respuesta = {

     	              sensor:"Valor PH",
     	              ph:+valorPH
                     };

                    res.send(respuesta);

               })
         .catch(error => {
         	
                 const respuesta = {

     	              sensor:"Valor PH",
     	              ph:+valorPH
                     };

                    res.send(respuesta);
                

                 console.log("Error AXIOS: "+error);
               });


    
});






app.get('/tempext', (req, res) => {

	 

     let tempExt = DS18B20.readC(ds18b20_Ext,2);
     console.log("Temperatura Exterior = %d",+tempExt);

     const respuesta = {

     	sensor:"exterior",
     	temperatura:+tempExt
     };

     res.send(respuesta);

    
});

app.get('/estado', (req, res) => {

	 

    
     console.log("Lectura Estado");

     const respuesta = {

     	"aire":localStorage.getItem('aire'),
     	"aux":localStorage.getItem('aux'),
     	"luz40":localStorage.getItem('luz40'),
     	"luz80":localStorage.getItem('luz80'),
     	"fil40":localStorage.getItem('fil40'),
     	"fil80":localStorage.getItem('fil80')
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

	
return new Promise ( resolve => {

      const sensorCorriente = mcpadc3002.openMcp3002(0, {speedHz: 20000}, (err) => { 
   

       if (err) throw err;
       
       try{
           sensorCorriente.read((err, reading) => {
            if (err) throw err;
           
             resolve(reading.rawValue);

          });

       }catch(err){ 
       	 console.log("Errr lectura ADC");
       }
    
      });  

    });
     
}

async function readAdcZero(){

 var readValue = 0;
 var minValue=1024;
 var maxValue=0;
 var result=0; 
 


let  start = Date.now();
    do {
        
        
            readValue = await readAdc();
            //console.log("Read %d",readValue);
      
       if (readValue > maxValue)
       {
      /*record the maximum sensor value*/
        maxValue = readValue;
       }
       if (readValue < minValue)
       {
      /*record the maximum sensor value*/
         minValue = readValue;
        }

    } while (Date.now() - start <= 1000); 

   
   result=((maxValue - minValue) * 3.3) / 1024.0;
   
   

   let mVperAmp=66;
   let Voltage = result;
   let VRMS = (Voltage / 2.0) * 0.707;
   AmpsRMS = ((VRMS * 1000) / mVperAmp) - 0.3;

   
   console.log("Amperios %d", AmpsRMS);
  
   
  
}



app.get ('/corriente',(req,res) => {

       
        try
        {
        readAdcZero();
        
        }catch(err){

        	console.log("Error Lectura ADC");
        }

        const respuesta = {

     	sensor:"corriente",
     	corriente:+ AmpsRMS
     	
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

 if(localStorage.getItem('aire') ==='on')
 	 mcp.digitalWrite(AIRE, mcp.LOW); 
 if(localStorage.getItem('aire') ==='off')
 	 mcp.digitalWrite(AIRE, mcp.HIGH); 	


 if(localStorage.getItem('luz40') ==='on')
 	 mcp.digitalWrite(LUZ40, mcp.LOW); 
 if(localStorage.getItem('luz40') ==='off')
 	 mcp.digitalWrite(LUZ40, mcp.HIGH); 


 if(localStorage.getItem('luz80') ==='on')
 	 mcp.digitalWrite(LUZ80, mcp.LOW); 
 if(localStorage.getItem('luz80') ==='off')
 	 mcp.digitalWrite(LUZ80, mcp.HIGH); 

 if(localStorage.getItem('aux') ==='on')
 	 mcp.digitalWrite(AUX, mcp.LOW); 
 if(localStorage.getItem('aux') ==='off')
 	 mcp.digitalWrite(AUX, mcp.HIGH);  	 	 	
	 	 	

// Start server
var server = app.listen(3000, () => {
console.log('Control Acuario ,puerto %d', server.address().port);
});


