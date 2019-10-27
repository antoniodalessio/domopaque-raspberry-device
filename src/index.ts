var express = require('express');
var sensorLib = require('node-dht-sensor');
import { config } from './config'
var app = express();

const Gpio = require('onoff').Gpio;

const main_light = new Gpio(17, 'out');
const main_light_switch = new Gpio(27, 'in', 'rising', {debounceTimeout: 200});

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

  main_light_switch.watch((err, value) => {
    let val = main_light.readSync()
    console.log(val)
    if (val == 0 || val == 1) {
      val = val ^ 1
      console.log("newVal", val)
      main_light.writeSync(val);
    }
  });


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
          range: [0,1],
          step: 1,
          value: await main_light.read()
        },
        { 
          name: 'main_light_switch',
          range: [0,1],
          step: 1,
          value: await main_light_switch.read()
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
      main_light.writeSync(value);
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({msg: value}));
  })

  app.get('/main_light', async function (req, res) {
    let value = await main_light.read()
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({value}));
  })

  

}
