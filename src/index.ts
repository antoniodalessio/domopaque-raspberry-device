var express = require('express');
var sensorLib = require('node-dht-sensor');
import { config } from './config'
import { watch } from 'fs';
var app = express();

//const Gpio = require('onoff').Gpio;
const Gpio = require('pigpio').Gpio;

//const main_light = new Gpio(17, 'out');
//const main_light_switch = new Gpio(18, 'in', 'rising', {debounceTimeout: 200});

const main_light = new Gpio(17, {mode: Gpio.OUTPUT});

const main_light_switch = new Gpio(18, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_DOWN,
 edge: Gpio.RISING_EDGE,
alert: true
});

main_light_switch.glitchFilter(100000);

main_light_switch.on('alert', (level, alert) => {
 // const state = main_light.digitalRead()
 //main_light.digitalWrite(state ^ 1)
console.log(alert)
 if (level === 0) {
	console.log("level", level)
	const state = main_light.digitalRead()
    main_light.digitalWrite(state ^ 1)
  }
});


process.on('SIGINT', _ => {
  main_light.unexport();
  main_light_switch.unexport();
});

app.use(express.json());

app.listen(3005, async function () {
  console.log('Server Running on port 3005!');
  await initApp()
});

async function initApp() {

  /*main_light_switch.watch(async (err, value) => {
    //let val = await main_light.read()
    console.log(value)
    if (value == 0 || value == 1) {
      value = value ^ 1
      console.log("newVal", value)
      main_light.writeSync(value);
    }
  });*/

  await createRoutes();
}


async function createRoutes() {
  
  app.get('/ping', async function (req, res) {

    let sens = await sensorLib.read(11, 4);

    let data =  {
      deviceName: config.name,
      ip: config.ip,
      sensors: [
        {
          temperature: sens.temperature.toFixed(2),
        },
        {
          umidity: sens.humidity.toFixed(2),
        }
      ],
      actuators: [
        { 
          name: 'main_light',
          alias: 'soggiorno_main_light',
          range: [0,1],
          step: 1,
          value: await main_light.digitalRead()
        }
      ]
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  });


  app.get('/temperature', async function (req, res) {
    let sens = await sensorLib.read(11, 4);
    let data = {
      value: sens.temperature.toFixed(2),
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  })

  app.get('/umidity', async function (req, res) {
    let sens = await sensorLib.read(11, 4);
    let data = {
      value: sens.humidity.toFixed(2),
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  })

  app.post('/main_light', async function (req, res) {
    let value = parseInt(req.body.value)
    if (value == 0 || value == 1) {
      main_light.digitalWrite(value);
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({msg: value}));
  })

  app.get('/main_light', async function (req, res) {
    let value = await main_light.digitalRead()
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({value}));
  })

  

}
